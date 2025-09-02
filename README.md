# Travelmate

> Full-stack travel packing checklist application built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Repository Description

TravelMate helps travelers prepare their packing checklist in seconds. With Google OAuth authentication, category tagging, and AI-powered generation (coming soon), you can focus on your journey instead of worrying about what to pack.

---

## Features

- **Google OAuth Authentication**: Secure and simple login with your Google account.
- **Dynamic Checklist Builder**: Create a packing checklist by entering destination, duration, season, and preferences.
- **Category Tagging**: Organize items into Clothing, Documents, Electronics, Food, Health, and More.
- **Checklist Management**: Add, edit, remove items; everything syncs to your dashboard.
- **Export & Sharing**: Export checklists as PDF or share via unique links.
- **AI-Generated Packing Lists**: One-click generation of optimized packing lists using AI models from OpenRouter.

---

## Tech Stack

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: Google OAuth
- **Cache**: Redis

---

## Roadmap

- AI-powered checklist generation with caching and validation.
- Real-time Collaboration: Share and edit checklists with friends or family.
- Calendar Integration: Sync packing reminders with Google Calendar.
- Offline Support / PWA: Access your checklists without internet.
- Notifications & Reminders: Automated packing reminders.
- Multi-language: Support for English and Bahasa Indonesia.

---

## AI-Powered Packing Lists

TravelMate now features AI-generated packing lists powered by OpenRouter's DeepSeek model! This feature allows you to:

1. **Generate comprehensive packing lists** tailored to your destination, trip duration, and preferences
2. **Save time** by automating the checklist creation process
3. **Get personalized recommendations** based on season and trip type

### How to Use:

1. Navigate to the "AI Packing List" page from the navigation menu
2. Enter your trip details (destination, dates, season, preferences)
3. Click "Generate AI Packing List" and wait a few seconds
4. Review and customize the generated packing list
5. Your list is automatically saved and can be accessed from "My Checklists"

The AI will categorize items into meaningful groups (Clothing, Documents, Electronics, Food, Health, Equipment, and Others) to help you stay organized.

### Environment Setup

To use the AI feature, you need an OpenRouter API key:

1. Register at [OpenRouter](https://openrouter.ai/)
2. Create an API key
3. Add the key to your `.env.local` file:

```
OPENROUTER_API_KEY=your_api_key_here
```
