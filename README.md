# Kanban Board

A modern drag-and-drop Kanban board application built with React, Vite, and TailwindCSS.

## Project Overview

Kanban Board is a task management application that allows users to organize tasks across columns (To Do, In Progress, Completed). Features include:

- **Drag & drop** task movement between columns using `@hello-pangea/dnd`
- **Add, edit, and delete** cards within columns
- **Deadline tracking** with visual badges (Overdue, Due Today, Soon, Far)
- **Local storage persistence** - your data persists across browser sessions
- **Responsive design** built with TailwindCSS

## How to Run in Local

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost://3000
```

Available scripts:
- `npm run dev` - Starts Vite dev server with HMR
- `npm run build` - Builds for production
- `npm run lint` - Runs ESLint
- `npm run preview` - Preview production build locally

## Demo

Live demo available at: **https://kanb-board.vercel.app**

*(Or check the deployment section below for custom deployment)*

## Additional Content

### Technology Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS 4** - Styling
- **@hello-pangea/dnd** - Drag and drop functionality
- **React Hooks** - State management

### Data Persistence

All board data is automatically saved to local storage. Your columns and cards persist even after closing the browser.

### Column Structure

Default columns are:
- **To Do** (`col-1`) - New tasks start here
- **In Progress** (`col-2`) - Currently being worked on
- **Completed** (`col-3`) - Finished tasks

### Drag & Drop

- Tasks can be dragged between columns
- Visual feedback shows dragging state
- Drop target highlights when dragging over

### Card Features

- **Double-click** to edit card title
- **Deadline picker** with color-coded badges
  - Red: Overdue
  - Orange: Due Today
  - Yellow: Soon (within 7 days)
  - Gray: No deadline set
- Delete button to remove cards

### Customization

To add new columns, modify `src/hooks/useBoard.js` and add corresponding Tailwind classes in `src/components/Column.jsx`.