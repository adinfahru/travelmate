"use server";

import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { generatePackingList, type PackingListParams } from "@/lib/ai";

// Define the type for the checklist result
export type ChecklistResult = {
  success: boolean;
  error?: string;
  checklistId?: string;
  usedFallback?: boolean;
};

export async function generatePackingListAndCreateChecklist(
  formData: FormData
): Promise<ChecklistResult> {
  const session = await getSession();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "You must be logged in to create a checklist",
    };
  }

  try {
    // Get form values
    const name = formData.get("name") as string;
    const destination = formData.get("destination") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const season = (formData.get("season") as string) || undefined;
    const preferences = (formData.get("preferences") as string) || undefined;

    // Validate required fields
    if (!destination || !startDate || !endDate) {
      return {
        success: false,
        error: "Destination, start date, and end date are required",
      };
    }

    // Calculate duration
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
    );

    if (duration <= 0) {
      return {
        success: false,
        error: "End date must be after start date",
      };
    }

    // Prepare AI parameters
    const aiParams: PackingListParams = {
      destination,
      duration,
      season,
      preferences,
    };

    let usedFallback = false;

    // Generate packing list using AI
    let packingItems;
    try {
      packingItems = await generatePackingList(aiParams);
    } catch (error) {
      // If AI fails, we'll still create the checklist but mark it as fallback
      console.error("AI generation failed:", error);
      usedFallback = true;
      // Try one more time to get fallback list
      packingItems = await generatePackingList(aiParams);
    }

    // Create trip
    const trip = await prisma.trip.create({
      data: {
        name: name || `Trip to ${destination}`,
        destination,
        startDate: start,
        endDate: end,
        duration,
        season,
        preferences,
        userId: session.user.id,
      },
    });

    // Create checklist
    const checklist = await prisma.checklist.create({
      data: {
        tripId: trip.id,
      },
    });

    // Get or create categories and items
    const categoryMap = new Map<string, string>();
    const uniqueCategories = [
      ...new Set(packingItems.map((item) => item.categoryName)),
    ];

    for (const categoryName of uniqueCategories) {
      let category = await prisma.category.findFirst({
        where: { name: categoryName },
      });

      if (!category) {
        category = await prisma.category.create({
          data: { name: categoryName },
        });
      }

      categoryMap.set(categoryName, category.id);
    }

    // Create items and checklist items
    for (const packingItem of packingItems) {
      // Get or create the item
      let item = await prisma.item.findFirst({
        where: {
          name: packingItem.name,
          categoryId: categoryMap.get(packingItem.categoryName),
        },
      });

      if (!item) {
        item = await prisma.item.create({
          data: {
            name: packingItem.name,
            categoryId: categoryMap.get(packingItem.categoryName)!,
          },
        });
      }

      // Create checklist item
      await prisma.checklistItem.create({
        data: {
          checklistId: checklist.id,
          itemId: item.id,
          isChecked: false,
        },
      });
    }

    return {
      success: true,
      checklistId: checklist.id,
      usedFallback,
    };
  } catch (error) {
    console.error("Error creating AI checklist:", error);

    // Check if it's a specific AI error that we should handle gracefully
    const err = error as Error;
    if (err?.message?.includes("API error: 429")) {
      return {
        success: false,
        error:
          "AI service is currently rate-limited. Please try again in a few minutes, or use our template-based checklist instead.",
      };
    }

    return {
      success: false,
      error:
        "Failed to generate AI packing list. Please try again or use our template-based checklist.",
    };
  }
}
