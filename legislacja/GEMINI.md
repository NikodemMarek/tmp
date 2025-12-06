# Gemini Project Notes: Legislation Directives Viewer

This document outlines the development and current state of the Legislation Directives Viewer project.

## Project Overview
The goal of this project is to create a web application that displays a list of legislative directives. Users can view directives, see their progress on a roadmap, and filter them using a powerful property-based search.

## Key Features Implemented:

1.  **Directive Listing:**
    *   Displays a list of directives, each with a title, creation date, status, description, and author.
    *   Initially displayed as a table, later refactored to a card-based layout for better readability and detail.

2.  **Directive Detail View (Master-Detail Layout):**
    *   Clicking a "View" button on a directive card transitions the layout, moving the list to the side and opening a detailed view in the center.
    *   The detail view currently serves as a placeholder for more extensive information.

3.  **Legislation Roadmap:**
    *   Integrated into the directive detail view.
    *   Visualizes the Polish legislation process steps as a series of dots.
    *   The `currentStep` of the selected directive is highlighted.
    *   Previous steps are marked as "completed."
    *   Roadmap dots are clickable, expanding to show placeholder information for each step.

4.  **Property-Based Search with Suggestions:**
    *   A search bar allows users to filter directives.
    *   Supports free-text search across `title`, `description`, and `author`.
    *   Supports property-based filtering using `property:value` syntax (e.g., `status:completed`, `author:Ministry`).
    *   Buttons next to the search bar suggest available properties (`status:`, `author:`).
    *   When the cursor is after a colon (`:`), a suggestion popup appears with possible values for that property (e.g., "completed", "in progress" for `status:` or unique author names for `author:`).

5.  **Light Mode Theme:**
    *   The application is configured to enforce a light mode theme for better readability.

## Important Files and Components:

*   **`src/App.tsx`**: Main application component. Manages global state (selected directive, search query, suggestions), filters directives, and orchestrates other components.
*   **`src/components/DirectiveList.tsx`**: Displays the list of directive cards.
*   **`src/components/DirectiveDetail.tsx`**: Displays the detailed view of a selected directive, including the roadmap.
*   **`src/components/Roadmap.tsx`**: Renders the legislation process roadmap with clickable steps and expandable details.
*   **`src/components/SearchBar.tsx`**: The search input component, including property suggestion buttons and the dynamic suggestion popup.
*   **`src/types.ts`**: Defines the `Directive` type, including `title`, `creationDate`, `status`, `description`, `currentStep`, `tags` (initially used for tag filter, now part of searchable fields), and `author`.
*   **`src/mockData.ts`**: Provides sample data for directives.
*   **`src/legislationSteps.ts`**: Defines the static steps of the Polish legislation process.
*   **`src/App.css`**: Contains all styling for the application, including layout, cards, roadmap, search bar, and suggestions.
*   **`src/index.css`**: Configures global styles and ensures light mode is enforced.

## Future Considerations/Potential Improvements:

*   **Dynamic Property Suggestions:** Currently, `availableProperties` are hardcoded. These could be dynamically generated from directive keys.
*   **Full Directive Detail View:** Populate the `DirectiveDetail` component with actual directive information beyond just the roadmap.
*   **Persist State:** Implement local storage or a backend to persist selected directive, search queries, etc.
*   **Error Handling/Loading States:** Add more robust error handling and loading indicators for data fetching (if data were fetched asynchronously).
*   **Accessibility:** Further improve accessibility for all interactive elements.
*   **Responsiveness:** Enhance responsiveness for various screen sizes, especially the master-detail layout.
*   **Advanced Search Syntax:** Support more complex search operators (e.g., `NOT`, `OR`, `AND`, wildcards).
*   **Testing:** Add unit and integration tests for components and filtering logic.
*   **Backend Integration:** Connect to a real API for directives instead of mock data.
