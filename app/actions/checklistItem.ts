"use server";

import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function toggleChecklistItem(checklistItemId: string) {
  try {
    // Get the authenticated user
    const user = await getUserSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Find the checklistItem
    const checklistItem = await prisma.checklistItem.findUnique({
      where: { id: checklistItemId },
      include: { checklist: { include: { trip: true } } },
    });

    if (!checklistItem) {
      throw new Error("Checklist item not found");
    }

    // Verify that this item belongs to the current user
    if (checklistItem.checklist.trip.userId !== user.id) {
      throw new Error("Unauthorized");
    }

    // Toggle the checked status
    const updatedItem = await prisma.checklistItem.update({
      where: { id: checklistItemId },
      data: { isChecked: !checklistItem.isChecked },
    });

    // Revalidate the checklist page to update the UI
    revalidatePath(`/checklists/${checklistItem.checklistId}`);

    return { success: true, isChecked: updatedItem.isChecked };
  } catch (error) {
    console.error("Failed to toggle checklist item:", error);
    return { success: false, error: "Failed to update item" };
  }
}

export async function addItemToChecklist(formData: FormData) {
  try {
    // Get the authenticated user
    const user = await getUserSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Extract form data
    const checklistId = formData.get("checklistId") as string;
    const itemName = formData.get("itemName") as string;
    const categoryId = formData.get("categoryId") as string;

    // Validate data
    if (!checklistId || !itemName || !categoryId) {
      throw new Error("Required fields are missing");
    }

    // Verify that this checklist belongs to the current user
    const checklist = await prisma.checklist.findUnique({
      where: { id: checklistId },
      include: { trip: true },
    });

    if (!checklist || checklist.trip.userId !== user.id) {
      throw new Error("Unauthorized");
    }

    // Check if the item already exists
    let item = await prisma.item.findFirst({
      where: {
        name: { equals: itemName, mode: "insensitive" },
        categoryId,
      },
    });

    // If item doesn't exist, create it
    if (!item) {
      item = await prisma.item.create({
        data: {
          name: itemName,
          categoryId,
        },
      });
    }

    // Check if this item is already in the checklist
    const existingChecklistItem = await prisma.checklistItem.findFirst({
      where: {
        checklistId,
        itemId: item.id,
      },
    });

    if (existingChecklistItem) {
      throw new Error("Item already exists in this checklist");
    }

    // Add the item to the checklist
    await prisma.checklistItem.create({
      data: {
        checklistId,
        itemId: item.id,
        isChecked: false,
      },
    });

    // Revalidate the checklist page to update the UI
    revalidatePath(`/checklists/${checklistId}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to add item to checklist:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteChecklistItem(checklistItemId: string) {
  try {
    // Get the authenticated user
    const user = await getUserSession();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Find the checklistItem
    const checklistItem = await prisma.checklistItem.findUnique({
      where: { id: checklistItemId },
      include: { checklist: { include: { trip: true } } },
    });

    if (!checklistItem) {
      throw new Error("Checklist item not found");
    }

    // Verify that this item belongs to the current user
    if (checklistItem.checklist.trip.userId !== user.id) {
      throw new Error("Unauthorized");
    }

    const checklistId = checklistItem.checklistId;

    // Delete the checklist item
    await prisma.checklistItem.delete({
      where: { id: checklistItemId },
    });

    // Revalidate the checklist page to update the UI
    revalidatePath(`/checklists/${checklistId}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to delete checklist item:", error);
    return { success: false, error: "Failed to delete item" };
  }
}
