# HeartLink - Emotional Wellness

HeartLink is a full-stack emotional wellness web app for mood tracking, private user accounts, dashboard history, and an optional AI coach powered by OpenRouter.

## Features

- User registration and login with JWT authentication
- Mood check-ins with emotion, intensity, and notes
- Personal dashboard with mood history
- Delete mood entries
- AI wellness chat endpoint using OpenRouter
- Responsive React interface with animations
- Local MongoDB Community Server support

## Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Axios
- Framer Motion
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB Community Server or MongoDB Atlas
- Mongoose
- JWT authentication
- OpenRouter API integration

## Project Structure

```text
heartlink/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── .env.example
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## Environment Setup

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/heartlink
JWT_SECRET=replace_with_strong_secret
FRONTEND_URL=http://localhost:5173
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/free
OPENROUTER_SITE_URL=http://localhost:5173
OPENROUTER_APP_NAME=HeartLink
```

Create `frontend/.env` from `frontend/.env.example` if needed:

```env
VITE_API_URL=http://localhost:5000
```

## Run Locally

Start MongoDB Community Server:

```powershell
Start-Service MongoDB
```

Install and run the backend:

```powershell
cd backend
npm install
npm run dev
```

Install and run the frontend in another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the app:

```text
http://localhost:5173
```

The backend API runs at:

```text
http://localhost:5000
```

## API Routes

- `POST /api/auth/register` - create a user account
- `POST /api/auth/login` - sign in and receive a JWT
- `GET /api/mood` - get the logged-in user's mood entries
- `POST /api/mood` - create a mood entry
- `DELETE /api/mood/:id` - delete a mood entry
- `POST /api/chat` - send chat messages to the AI coach

## Notes

- `backend/.env` is ignored by Git so secrets are not committed.
- `node_modules`, build output, and Vercel metadata are ignored.
- The AI chat feature requires `OPENROUTER_API_KEY`; the rest of the app can run without it.
