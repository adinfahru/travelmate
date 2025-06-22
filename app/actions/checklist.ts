"use server";

import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

// Define the type for the checklist result
export type ChecklistResult = {
  success: boolean;
  error?: string;
  checklistId?: string;
};

export async function createChecklist(
  formData: FormData
): Promise<ChecklistResult> {
  const session = await getSession();

  if (!session?.user) {
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
    const duration = parseInt(formData.get("duration") as string) || 0;
    const season = (formData.get("season") as string) || undefined;
    const preferences = (formData.get("preferences") as string) || undefined;
    const templateType = (formData.get("templateType") as string) || undefined;

    // Validate required fields
    if (!name || !destination || !startDate || !endDate || !duration) {
      return { success: false, error: "All required fields must be provided" };
    }

    // Create trip and checklist
    const trip = await prisma.trip.create({
      data: {
        name,
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        duration,
        season,
        preferences,
        userId: session.user.id as string,
      },
    });

    const checklist = await prisma.checklist.create({
      data: {
        tripId: trip.id,
      },
    });
    // If a template was selected, add template items
    if (templateType && templateType !== "kosong") {
      // Get categories based on template type
      const categoryNames: string[] = [];

      if (templateType === "gunung") {
        categoryNames.push("Pakaian", "Kesehatan", "Peralatan", "Makanan");
      } else if (templateType === "pantai") {
        categoryNames.push("Pakaian", "Kesehatan", "Peralatan", "Hiburan");
      } else if (templateType === "antarkota") {
        categoryNames.push("Dokumen", "Elektronik", "Pakaian");
      } else if (templateType === "luarnegeri") {
        categoryNames.push("Dokumen", "Elektronik", "Pakaian", "Kesehatan");
      }

      // Get items by categories
      if (categoryNames.length > 0) {
        const categories = await prisma.category.findMany({
          where: {
            name: {
              in: categoryNames,
            },
          },
          include: {
            items: true,
          },
        });

        // Now add all items to the checklist
        const checklistItems = [];

        for (const category of categories) {
          for (const item of category.items) {
            checklistItems.push({
              checklistId: checklist.id,
              itemId: item.id,
              isChecked: false,
            });
          }
        }

        if (checklistItems.length > 0) {
          await prisma.checklistItem.createMany({
            data: checklistItems,
          });
        }
      }
    }

    // Return success result with the new checklist ID
    return {
      success: true,
      checklistId: checklist.id,
    };
  } catch (error) {
    console.error("Error creating checklist:", error);
    return {
      success: false,
      error:
        typeof error === "object" && error !== null && "message" in error
          ? (error as Error).message
          : "An error occurred while creating the checklist",
    };
  }
}

// Define the function to get a checklist by ID
export async function getChecklist(id: string) {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  try {
    return await prisma.checklist.findUnique({
      where: { id },
      include: {
        trip: true,
        items: {
          include: {
            item: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching checklist:", error);
    return null;
  }
}
