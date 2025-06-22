import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = [
    { name: "Pakaian" },
    { name: "Dokumen" },
    { name: "Makanan" },
    { name: "Elektronik" },
    { name: "Perlengkapan Mandi" },
    { name: "Obat-obatan" },
    { name: "Perlengkapan Outdoor" },
    { name: "Lain-lain" },
  ];

  console.log("Seeding categories...");
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Common items for each category
  const items = [
    // Pakaian
    { name: "Kaos", categoryName: "Pakaian" },
    { name: "Celana", categoryName: "Pakaian" },
    { name: "Jaket", categoryName: "Pakaian" },
    { name: "Pakaian dalam", categoryName: "Pakaian" },
    { name: "Kaus kaki", categoryName: "Pakaian" },

    // Dokumen
    { name: "KTP", categoryName: "Dokumen" },
    { name: "Paspor", categoryName: "Dokumen" },
    { name: "SIM", categoryName: "Dokumen" },
    { name: "Tiket", categoryName: "Dokumen" },
    { name: "Asuransi perjalanan", categoryName: "Dokumen" },

    // Elektronik
    { name: "Ponsel", categoryName: "Elektronik" },
    { name: "Charger", categoryName: "Elektronik" },
    { name: "Power bank", categoryName: "Elektronik" },
    { name: "Kamera", categoryName: "Elektronik" },
    { name: "Adapter", categoryName: "Elektronik" },

    // Perlengkapan mandi
    { name: "Sikat gigi", categoryName: "Perlengkapan Mandi" },
    { name: "Pasta gigi", categoryName: "Perlengkapan Mandi" },
    { name: "Sabun", categoryName: "Perlengkapan Mandi" },
    { name: "Shampoo", categoryName: "Perlengkapan Mandi" },
    { name: "Handuk", categoryName: "Perlengkapan Mandi" },

    // Obat-obatan
    { name: "Obat demam", categoryName: "Obat-obatan" },
    { name: "Obat diare", categoryName: "Obat-obatan" },
    { name: "Plester", categoryName: "Obat-obatan" },
    { name: "Antiseptik", categoryName: "Obat-obatan" },

    // Perlengkapan outdoor
    { name: "Tenda", categoryName: "Perlengkapan Outdoor" },
    { name: "Sleeping bag", categoryName: "Perlengkapan Outdoor" },
    { name: "Matras", categoryName: "Perlengkapan Outdoor" },
    { name: "Kompor portable", categoryName: "Perlengkapan Outdoor" },
    { name: "Senter", categoryName: "Perlengkapan Outdoor" },
  ];

  // Add items to each category
  console.log("Seeding items...");
  for (const item of items) {
    const category = await prisma.category.findFirst({
      where: { name: item.categoryName },
    });

    if (category) {
      await prisma.item.upsert({
        where: {
          name_categoryId: {
            name: item.name,
            categoryId: category.id,
          },
        },
        update: {},
        create: {
          name: item.name,
          categoryId: category.id,
        },
      });
    }
  }

  // Create template trips
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const templates = [
    {
      name: "Template Gunung",
      destination: "Pendakian Gunung",
      description: "Checklist untuk perjalanan pendakian gunung",
      isTemplate: true,
      templateType: "gunung",
    },
    {
      name: "Template Pantai",
      destination: "Liburan di Pantai",
      description: "Checklist untuk liburan ke pantai",
      isTemplate: true,
      templateType: "pantai",
    },
    {
      name: "Template Antar Kota",
      destination: "Perjalanan Antar Kota",
      description: "Checklist untuk perjalanan antar kota",
      isTemplate: true,
      templateType: "antarkota",
    },
    {
      name: "Template Luar Negeri",
      destination: "Perjalanan Internasional",
      description: "Checklist untuk perjalanan ke luar negeri",
      isTemplate: true,
      templateType: "luarnegeri",
    },
  ];

  console.log("Templates will need to be manually created by admin users");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
