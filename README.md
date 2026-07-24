# Traccio — Job Application Tracker

🔗 **Live Demo:** https://traccio.netlify.app/

Traccio is a responsive web application for organising a job search in one place. Users can create an account, record each job application, track its progress through the hiring process, and view a dashboard that summarises their search activity.

The project uses **Appwrite as its backend-as-a-service** for authentication and persistent application data. The React frontend provides the interface, state management, routing, validation, and visual analytics.


## What the project does

Job seekers often apply to many roles across different companies and need a simple way to remember their application status, dates, job links, interview notes, and next steps. Traccio keeps these details together in a personal dashboard so users can monitor their progress from application to offer or rejection.

## Current functionality

### User accounts and access

- Sign up with name, email, and password
- Sign in with an existing Appwrite email/password account
- Restore the signed-in session on refresh
- Protect the application area from unauthenticated users
- Update the account display name
- Sign out securely

### Job application management

- Add an application with role, company, location, status, date applied, job-posting URL, and notes
- Edit existing application details
- Delete an application with a confirmation prompt
- Store and retrieve applications through Appwrite Database
- Open a saved job-posting link directly from the table
- Validate required fields before saving

### Tracking and organisation

- Track application stages: **Applied, OA, Round 1, Interview, Offer,** and **Rejected**
- Search applications by role, company, location, or status
- Filter applications by stage
- Sort applications by most recently applied
- View applications in a clear responsive table

### Dashboard and user experience

- View a bar chart of applications grouped by stage
- See quick metrics for total applications, online assessments, interviews, offers, and rejections
- Use responsive desktop and mobile navigation
- Switch between light and dark themes
- Receive clear loading and Appwrite error feedback

## Technologies and concepts used

| Area | Technologies / concepts |
| --- | --- |
| Frontend | React 19, JSX, Vite |
| Routing | React Router with nested routes and protected-route redirects |
| State management | Redux Toolkit and React Redux for authentication and application state |
| Backend | Appwrite Account API for authentication and Appwrite Database API for application records |
| Forms | React Hook Form is installed; application forms use controlled React inputs and client-side validation |
| Styling | Tailwind CSS, responsive design, CSS custom properties, light/dark theming |
| UI | Lucide React icons, accessible labels, dialogs, alerts, confirmations, and an SVG bar chart |
| Data operations | CRUD: create, read, update, and delete application documents |
| Configuration | Environment variables through Vite's `VITE_` convention |

## How Appwrite is used as the backend

Appwrite provides authentication and cloud database services used by Traccio, allowing the application to securely manage users and persist job application records without building a custom backend.

- **Authentication:** Appwrite Account manages registration, email/password login, sessions, logout, current-user retrieval, and profile-name updates.
- **Database:** Appwrite Database stores each job application as a document.
- **Security:** With Document Security enabled, applications created by an authenticated user are restricted to that user.
- **Client integration:** The Appwrite JavaScript SDK is configured using values from the `.env` file.

## Appwrite database setup

Create a database and collection, then use their IDs in the environment variables below. Enable **Document Security** on the collection.

| Attribute | Type | Required |
| --- | --- | --- |
| `role` | String (120) | Yes |
| `company` | String (120) | Yes |
| `location` | String (80) | Yes |
| `jobLink` | String (500) | No |
| `status` | String (30) | Yes |
| `dateApplied` | String (10) | Yes |
| `notes` | String (600) | No |

## Run locally

1. Clone the repository and open the project directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.sample` to `.env`.
4. Replace the placeholder values with your Appwrite endpoint, project ID, database ID, and collection ID:

   ```env
   VITE_APPWRITE_URL="https://<region>.cloud.appwrite.io/v1"
   VITE_APPWRITE_PROJECT_ID="your_project_id"
   VITE_APPWRITE_DATABASE_ID="your_database_id"
   VITE_APPWRITE_COLLECTION_ID="your_collection_id"
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run lint` | Run ESLint checks |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |

## Planned upgrades

These are proposed next steps and are not part of the current project.

### Custom Backend

Replace the Backend-as-a-Service architecture with a Node.js backend using Express or NestJS, PostgreSQL, JWT authentication, REST APIs, logging, testing, and deployment.

### AI Assistant

Future versions may include an AI assistant capable of:

- Resume analysis
- Job description summarisation
- Interview preparation
- Cover-letter generation
- Personalized job search recommendations

### Other upgrade ideas

- Calendar integration and reminders for interviews, assessments, and follow-ups
- Email parsing to automatically update application stages from recruiter messages
- Resume and cover-letter file uploads with version history
- Kanban-board and timeline views
- Advanced analytics, such as response rate by company, role, location, or source
- Tags, saved filters, archived applications, and CSV/PDF export
- Multi-device real-time syncing and offline support
- Password reset, email verification, social login, and stronger account-security controls
- Automated tests, CI/CD deployment, monitoring, and accessibility audits

## Project status

This project is production-ready for its current scope and serves as the foundation for future enhancements listed above.
