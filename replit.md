# Replit Project Guide

## Overview

This is a full-stack web application built with React (frontend) and Express.js (backend) featuring a modern Arabic calculator interface. The application demonstrates a complete modern web stack with TypeScript, styled components using shadcn/ui, and a PostgreSQL database backend. The calculator supports Arabic numerals and includes features like calculation history with local storage persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks with custom calculator hook for business logic
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Local Storage**: Browser localStorage for calculation history persistence

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Development**: Hot reloading with Vite middleware integration
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database implementations
- **API Design**: RESTful API structure with `/api` prefix routing

### Component Structure
- **Modular Design**: Separated calculator components (display, buttons, history panel)
- **Custom Hooks**: Centralized calculator logic in `useCalculator` hook
- **Utility Functions**: Arabic/English numeral conversion and mathematical operations
- **Responsive Design**: Mobile-first approach with breakpoint considerations

### Database Schema
- **Users Table**: Basic user management with UUID primary keys
- **Schema Validation**: Zod integration with Drizzle for type-safe database operations
- **Migrations**: Automated database migrations with Drizzle Kit

### Build and Development
- **Development Mode**: Concurrent frontend and backend development with Vite HMR
- **Production Build**: Optimized client bundle with esbuild for server compilation
- **TypeScript**: Strict type checking across the entire application
- **Path Aliases**: Organized imports with @ aliases for cleaner code structure

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Connection**: PostgreSQL connection via DATABASE_URL environment variable
- **Session Storage**: connect-pg-simple for PostgreSQL session storage

### UI and Styling
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe utility for managing CSS class variants

### Development Tools
- **Drizzle Kit**: Database migrations and schema management
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution environment for development
- **Replit Integration**: Special development tooling for Replit environment

### Frontend Libraries
- **React Hook Form**: Form handling with validation (@hookform/resolvers)
- **Date-fns**: Modern date utility library
- **CMDK**: Command palette interface components
- **Embla Carousel**: Touch-friendly carousel component

### Utility Libraries
- **Nanoid**: URL-safe unique ID generator
- **CLSX**: Conditional className utility
- **Zod**: Runtime type validation and schema definition