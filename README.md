# LaunchLive RAG - Frontend

A premium, enterprise-grade RAG (Retrieval-Augmented Generation) platform frontend built with Next.js, Tailwind CSS, and Framer Motion. This project is designed with a high-end B2B SaaS aesthetic inspired by modern AI dashboards.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Backend Integration Guide (For Backend Developers)

The frontend is currently in a "Demo Mode" using mock data and simulated API calls. To connect it to your backend services, follow these steps:

### 1. API Configuration
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.your-service.com/v1
```

### 2. Required API Endpoints

#### Ingestion Service (`POST /ingest`)
- **Location**: `src/app/dashboard/ingest/page.tsx`
- **Functionality**: Replace `simulateUpload` with a real `fetch` or `axios` call.
- **Formats**: Support `multipart/form-data` for files and `application/json` for URL/Text.

#### Chat & Reasoning (`POST /chat`)
- **Location**: `src/app/dashboard/chat/page.tsx`
- **Payload**: `{ "message": "string", "stream": boolean }`
- **Requirement**: Implement Server-Sent Events (SSE) if you want real-time streaming responses (already styled in the UI).

#### Workspace Stats (`GET /stats`)
- **Location**: `src/app/dashboard/page.tsx`
- **Data needed**: Document counts, credit usage, recent activity logs.

#### Semantic Search (`GET /search`)
- **Location**: `src/app/dashboard/search/page.tsx`
- **Query**: `?q=search+term`
- **Response**: Return a list of relevant document chunks with similarity scores.

### 3. Key Integration Files
- `src/app/dashboard/page.tsx`: Main dashboard overview.
- `src/app/dashboard/ingest/page.tsx`: Data ingestion logic.
- `src/app/dashboard/chat/page.tsx`: AI chat interface.

---

## 🎨 Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4 (Custom Mesh Gradients)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Components**: Shadcn UI (Customized for Premium Light Mode)

---

## 📝 Notes
- **Light Mode Only**: The UI is strictly light mode. Do not add `dark:` classes.
- **Responsive**: The dashboard is optimized for desktop and tablet views.
