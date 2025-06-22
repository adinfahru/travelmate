"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";

export async function createChecklist(formData: FormData) {
  try {
    // Get the authenticated user
    const user = await getUserSession();

    // Extract form data
    const name = formData.get("name") as string;
    const destination = formData.get("destination") as string;
    const startDateStr = formData.get("startDate") as string;
    const endDateStr = formData.get("endDate") as string;
    const season = formData.get("season") as string;
    const duration = parseInt(formData.get("duration") as string);
    const preferences = formData.get("preferences") as string;
    const templateType = (formData.get("templateType") as string) || null;

    if (!name || !destination) {
      throw new Error("Name and destination are required");
    }

    // Create trip
    const trip = await prisma.trip.create({
      data: {
        name,
        destination,
        startDate: startDateStr ? new Date(startDateStr) : null,
        endDate: endDateStr ? new Date(endDateStr) : null,
        season,
        duration: isNaN(duration) ? null : duration,
        preferences,
        templateType,
        userId: user.id,
      },
    });

    // Create empty checklist for this trip
    const checklist = await prisma.checklist.create({
      data: {
        tripId: trip.id,
      },
    }); // If a template was selected, pre-populate checklist items
    if (templateType && templateType !== "kosong") {
      // Get all categories
      const categories = await prisma.category.findMany();

      // Define template-specific items by category
      const templateItems: Record<string, Record<string, string[]>> = {
        gunung: {
          "Perlengkapan Outdoor": [
            "Tenda",
            "Sleeping bag",
            "Matras",
            "Headlamp",
            "Kompor portable",
            "Nesting cookware",
            "Gas kaleng",
            "Pisau lipat",
            "Trekking pole",
            "Jas hujan",
            "Gaiter",
          ],
          Pakaian: [
            "Jaket waterproof",
            "Jaket fleece",
            "Baselayer",
            "Celana hiking",
            "Kaos kaki tebal",
            "Sarung tangan",
            "Kupluk/topi",
            "Buff",
          ],
          "Makanan & Minuman": [
            "Botol air (min. 2L)",
            "Makanan instan",
            "Snack energi",
            "Kopi/teh sachet",
          ],
          "Kesehatan & Kebersihan": [
            "P3K dasar",
            "Tabir surya",
            "Obat pribadi",
            "Hand sanitizer",
          ],
        },
        pantai: {
          Pakaian: [
            "Baju renang",
            "Sandal",
            "Baju ganti",
            "Topi pantai",
            "Kacamata hitam",
          ],
          "Perlengkapan Pantai": [
            "Tikar/alas duduk",
            "Payung pantai",
            "Pelampung",
            "Alat snorkeling",
          ],
          "Kesehatan & Kebersihan": [
            "Tabir surya",
            "After sun gel",
            "Handuk",
            "Tisu basah",
          ],
          Gadget: ["Kamera underwater", "Powerbank"],
        },
        antarkota: {
          Dokumen: [
            "KTP/SIM",
            "Tiket transportasi",
            "Voucher hotel",
            "Uang tunai",
          ],
          Pakaian: [
            "Pakaian harian",
            "Pakaian formal (bila perlu)",
            "Pakaian dalam",
            "Piyama",
          ],
          "Kesehatan & Kebersihan": [
            "Obat pribadi",
            "Perlengkapan mandi",
            "Masker",
          ],
          Gadget: ["Charger HP", "Powerbank", "Earphone"],
        },
        luarnegeri: {
          Dokumen: [
            "Paspor",
            "Visa",
            "Tiket pesawat",
            "Asuransi perjalanan",
            "Voucher hotel",
            "International driving permit",
            "Uang asing",
          ],
          Pakaian: [
            "Pakaian sesuai musim tujuan",
            "Pakaian formal (bila perlu)",
            "Pakaian dalam",
            "Piyama",
            "Jaket",
          ],
          "Kesehatan & Kebersihan": [
            "Obat pribadi",
            "Perlengkapan mandi",
            "First aid kit",
            "Masker",
            "Hand sanitizer",
          ],
          Gadget: [
            "Adapter universal",
            "Charger HP",
            "Powerbank",
            "Kamera",
            "Converter mata uang",
          ],
        },
      };

      // Get items for the selected template
      const templateConfig = templateItems[templateType];
      if (templateConfig) {
        // Process each category in the template
        for (const [categoryName, itemNames] of Object.entries(
          templateConfig
        )) {
          // Find the category
          const category = categories.find((c) => c.name === categoryName);

          if (category) {
            for (const itemName of itemNames) {
              // Try to find existing item
              let item = await prisma.item.findFirst({
                where: {
                  name: { equals: itemName, mode: "insensitive" },
                  categoryId: category.id,
                },
              });

              // Create item if it doesn't exist
              if (!item) {
                item = await prisma.item.create({
                  data: {
                    name: itemName,
                    categoryId: category.id,
                  },
                });
              }

              // Add item to checklist
              await prisma.checklistItem.create({
                data: {
                  checklistId: checklist.id,
                  itemId: item.id,
                  isChecked: false,
                },
              });
            }
          }
        }
      }
    }

    // Redirect to the checklist page
    redirect(`/checklists/${checklist.id}`);
  } catch (error) {
    console.error("Failed to create checklist:", error);
    // In a real app, you'd want to return the error and display it in the form
    redirect("/dashboard?error=Failed+to+create+checklist");
  }
}
