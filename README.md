# Legislacja App

This project is a web application designed to manage and display information related to legislative processes and act proposals. It allows users to browse directives, view details of specific legislative items, search through content, and propose new acts.

## Features

*   **Directive List:** View a list of legislative directives.
*   **Act Proposals List:** Browse proposed acts.
*   **Directive Detail View:** See detailed information about selected directives or act proposals, including discussions.
*   **Search Functionality:** Filter directives and act proposals by keywords.
*   **Add Act Proposal:** A modal for users to submit new act proposals.
*   **Info Page:** Provides information about the legislative process.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Vite:** A fast build tool that provides a lightning-fast development experience.
*   **Tailwind CSS:** A utility-first CSS framework (inferred from `tailwind.config.ts` and CSS files).
*   **pnpm:** A fast, disk space efficient package manager.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd legislacja
    ```
2.  Install the dependencies:
    ```bash
    pnpm install
    ```

### Running the Development Server

To start the development server:

```bash
pnpm dev
```

This will typically open the application in your browser at `http://localhost:5173`.

### Building for Production

To build the application for production:

```bash
pnpm build
```

The compiled assets will be placed in the `dist/` directory.

## Project Structure

*   `public/`: Static assets (e.g., `vite.svg`).
*   `src/`:
    *   `App.tsx`: The main application component.
    *   `main.tsx`: Entry point for the React application.
    *   `index.css`, `App.css`: Global and application-specific styles.
    *   `types.ts`: TypeScript type definitions.
    *   `mockData.ts`, `mockActProposals.ts`, `mockDiscussions.ts`: Mock data for directives, act proposals, and discussions.
    *   `components/`: Reusable React components (e.g., `DirectiveList`, `DirectiveDetail`, `SearchBar`, `AddActProposalModal`).
    *   `lib/`: Utility functions (e.g., `utils.ts`).
    *   `styles/`: Additional stylesheets (e.g., `_colors.css`).

## Usage

*   Navigate between "Procesy legislacyjne" (Legislative Processes), "Propozycje projektów ustaw" (Act Proposals), and "Czym jest legislacja?" (What is Legislation?) using the navigation buttons.
*   Click on an item in the lists to view its detailed information.
*   Use the search bar to filter items.
*   Click "Dodaj propozycję projektu ustawy" (Add Act Proposal) to open a modal and submit a new proposal.
