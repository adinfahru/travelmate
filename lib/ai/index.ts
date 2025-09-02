"use server";

import { cache } from "react";

export type PackingListParams = {
  destination: string;
  duration: number;
  season?: string;
  preferences?: string;
};

export type PackingListItem = {
  name: string;
  categoryName: string;
};

// Implement caching to reduce API calls for similar requests
export const generatePackingList = cache(async function generatePackingList(
  params: PackingListParams
): Promise<PackingListItem[]> {
  const { destination, duration, season, preferences } = params;

  // Construct prompt for the AI
  const prompt = `
Generate a detailed packing list for a trip to ${destination} for ${duration} days 
during ${season || "any season"} season.
${preferences ? `Additional preferences: ${preferences}` : ""}

Format your response as a valid JSON array where each item has:
1. "name": The name of the item to pack
2. "categoryName": The category it belongs to (choose from: "Pakaian", "Dokumen", "Elektronik", "Makanan", "Kesehatan", "Perlengkapan", "Lainnya")

Only return the JSON array, nothing else. Example format:
[
  {"name": "Passport", "categoryName": "Dokumen"},
  {"name": "T-shirts", "categoryName": "Pakaian"},
  ...
]
  `;

  try {
    // Function to retry the API call with exponential backoff
    const fetchWithRetry = async (retries = 3, delay = 1000) => {
      try {
        const controller = new AbortController();
        // Set a 20-second timeout for the request
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "HTTP-Referer": "https://travelmate.app",
              "X-Title": "TravelMate AI Packing Assistant",
            },
            body: JSON.stringify({
              model: "deepseek/deepseek-chat-v3.1:free",
              messages: [
                {
                  role: "user",
                  content: prompt,
                },
              ],
              temperature: 0.7,
              max_tokens: 2048,
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ message: "Failed to parse error response" }));
          console.error("OpenRouter API error:", errorData);

          // Check for rate limiting (429) and retry with backoff if we have retries left
          if (response.status === 429 && retries > 0) {
            console.log(
              `Rate limited. Retrying in ${delay}ms... (${retries} retries left)`
            );
            await new Promise((r) => setTimeout(r, delay));
            // Exponential backoff: double the delay for next retry
            return fetchWithRetry(retries - 1, delay * 2);
          }

          throw new Error(`API error: ${response.status}`);
        }

        return response;
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.name === "AbortError") {
          console.error("Request timed out");
          if (retries > 0) {
            console.log(
              `Request timed out. Retrying in ${delay}ms... (${retries} retries left)`
            );
            await new Promise((r) => setTimeout(r, delay));
            return fetchWithRetry(retries - 1, delay * 2);
          }
          throw new Error("API request timed out after multiple attempts");
        }
        throw error;
      }
    };

    // Try the fetch with retries
    const response = await fetchWithRetry();

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    const content = result.choices[0].message.content;

    // Extract JSON array from response
    let jsonString = content;

    // Sometimes AI might include markdown code blocks or extra text
    const jsonMatch =
      content.match(/```(?:json)?([\s\S]*?)```/) ||
      content.match(/(\[[\s\S]*\])/);
    if (jsonMatch) {
      jsonString = jsonMatch[1].trim();
    }

    try {
      const packingList = JSON.parse(jsonString) as PackingListItem[];
      return packingList;
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw content:", content);
      throw new Error("Failed to parse AI response as JSON");
    }
  } catch (error) {
    console.error("Error generating packing list with AI:", error);

    // Fallback to a basic packing list if API is unavailable
    const err = error as Error;
    if (
      err?.message &&
      (err.message.includes("API error: 429") ||
        err.message.includes("timed out"))
    ) {
      console.log("Using fallback packing list due to API limits");
      return getFallbackPackingList(params);
    }

    throw error;
  }
});

// Fallback function that returns a basic packing list without making API calls
function getFallbackPackingList(params: PackingListParams): PackingListItem[] {
  const { duration } = params;
  // Calculate clothes based on trip duration (unused for now but kept for future use)
  // const clothesCount = Math.min(Math.ceil(duration * 1.5), 14); // Max 2 weeks of clothes

  // Basic packing list that works for most trips
  const basicItems: PackingListItem[] = [
    // Clothing items
    { name: "Kaos", categoryName: "Pakaian" },
    { name: "Celana panjang", categoryName: "Pakaian" },
    { name: "Celana pendek", categoryName: "Pakaian" },
    { name: "Pakaian dalam", categoryName: "Pakaian" },
    { name: "Kaus kaki", categoryName: "Pakaian" },
    { name: "Jaket", categoryName: "Pakaian" },

    // Documents
    { name: "KTP", categoryName: "Dokumen" },
    { name: "Kartu ATM/Kredit", categoryName: "Dokumen" },
    { name: "Asuransi", categoryName: "Dokumen" },
    { name: "Tiket", categoryName: "Dokumen" },

    // Electronics
    { name: "Ponsel", categoryName: "Elektronik" },
    { name: "Charger ponsel", categoryName: "Elektronik" },
    { name: "Power bank", categoryName: "Elektronik" },
    { name: "Adapter", categoryName: "Elektronik" },

    // Toiletries
    { name: "Sikat gigi", categoryName: "Perlengkapan" },
    { name: "Pasta gigi", categoryName: "Perlengkapan" },
    { name: "Sabun mandi", categoryName: "Perlengkapan" },
    { name: "Shampoo", categoryName: "Perlengkapan" },
    { name: "Deodorant", categoryName: "Perlengkapan" },

    // Health items
    { name: "Obat pribadi", categoryName: "Kesehatan" },
    { name: "Obat P3K dasar", categoryName: "Kesehatan" },
    { name: "Hand sanitizer", categoryName: "Kesehatan" },

    // Others
    { name: "Dompet", categoryName: "Lainnya" },
    { name: "Kacamata", categoryName: "Lainnya" },
    { name: "Masker", categoryName: "Lainnya" },
  ];

  // Add duration-specific items
  if (duration > 3) {
    basicItems.push({ name: "Deterjen travel", categoryName: "Perlengkapan" });
  }

  if (duration > 7) {
    basicItems.push({
      name: "Travel adapter universal",
      categoryName: "Elektronik",
    });
    basicItems.push({ name: "Notebook/tablet", categoryName: "Elektronik" });
  }

  return basicItems;
}
