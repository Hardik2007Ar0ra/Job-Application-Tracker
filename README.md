# Traccio — Job Application Tracker

Traccio is a responsive job-application tracker that helps candidates manage roles, applications, interviews, and offers in one focused dashboard.

## Features

- Appwrite email/password authentication and profile updates
- Protected dashboard routes
- Create, edit, search, filter, and delete applications
- Application stage analytics and useful at-a-glance metrics
- Persistent application data using Redux and local storage
- Optional job-posting links and notes for each application
- Responsive navigation for desktop and mobile
- Light and dark theme preference saved with Context API

## Built with

- React and Vite
- React Router
- Redux Toolkit and React Redux
- Appwrite
- Tailwind CSS
- Lucide React icons

## Run locally

1. Install dependencies: `npm install`
2. Copy `.env.sample` to `.env` and add your Appwrite URL and project ID.
3. Start the app: `npm run dev`

## Appwrite database setup

Create a collection using the ID in `VITE_APPWRITE_COLLECTION_ID`. Add these attributes:

| Attribute | Type | Required |
| --- | --- | --- |
| `role` | String (120) | Yes |
| `company` | String (120) | Yes |
| `location` | String (80) | Yes |
| `jobUrl` | String (500) | No |
| `status` | String (30) | Yes |
| `appliedDate` | String (10) | Yes |
| `notes` | String (600) | No |

Enable **Document Security**. The app creates each document while the user is signed in, so Appwrite gives that user access to only their own applications by default.

## Available scripts

- `npm run dev` — start the development server
- `npm run lint` — check code quality
- `npm run build` — create a production build
