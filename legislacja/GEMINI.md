# Gemini Project Notes: Legislation Directives Viewer

This document outlines the development and current state of the Legislation Directives Viewer project.

## Project Overview
The goal of this project is to create a web application that displays a list of legislative directives. Users can view directives, see their progress on a roadmap, and filter them using a powerful property-based search.

## Key Features Implemented:

1.  **Directive Listing:**
    *   Displays a list of directives, each with a title, creation date, status, description, and author.
    *   Initially displayed as a table, later refactored to a card-based layout for better readability and detail.

2.  **Act Proposals Listing:**
    *   Displays a list of act proposals, each with a title, creation date, status, description, and tags.
    *   Integrates with the existing search and detail view mechanisms.

3.  **Directive/Act Proposal Detail View (Master-Detail Layout):**
    *   Clicking a "View" button on a card transitions the layout, moving the list to the side and opening a detailed view in the center.
    *   The detail view now conditionally displays specific information for directives (status, roadmap) or act proposals (file link, signature count, mObywatel signing button).

4.  **Legislation Roadmap:**
    *   Integrated into the directive detail view, displayed only for directives.
    *   Visualizes the Polish legislation process steps as a series of dots.
    *   The `currentStep` of the selected directive is highlighted.
    *   Previous steps are marked as "completed."
    *   Roadmap dots are clickable, expanding to show placeholder information for each step.

5.  **Notification and Interactive Discussion Features:**
    *   A "Powiadom o zmianach" (Notify about changes) button has been added to the detail view, allowing users to subscribe to updates.
    *   An interactive "Dyskusja Publiczna" (Public Discussion) section has been added to the act proposal detail view. This section now includes:
        *   An input box for submitting new comments and replies.
        *   A tree-like view for displaying example discussions and their replies.
        *   Functionality to reply to existing comments.
        *   Upvote and downvote buttons for individual comments.

6.  **Property-Based Search with Suggestions:**
    *   A search bar allows users to filter directives.
    *   Supports free-text search across `title`, `description`, and `author`.
    *   Supports property-based filtering using `property:value` syntax (e.g., `status:completed`, `author:Ministry`).
    *   Buttons next to the search bar suggest available properties (`status:`, `author:`).
    *   When the cursor is after a colon (`:`), a suggestion popup appears with possible values for that property (e.g., "completed", "in progress" for `status:` or unique author names for `author:`).

7.  **Light Mode Theme:**
    *   The application is configured to enforce a light mode theme for better readability.

## Important Files and Components:

*   **`src/App.tsx`**: Main application component. Now manages global state (selected item, search query, suggestions, current page), filters items, and orchestrates other components. Includes navigation between Directives and Act Proposals, and a structured layout for side-by-side display of content and detail views.
*   **`src/components/DirectiveList.tsx`**: Displays the list of directive cards.
*   **`src/components/ActProposalsList.tsx`**: Displays the list of act proposal cards (newly added).
*   **`src/components/DirectiveDetail.tsx`**: Displays the detailed view of a selected directive or act proposal. Now includes conditional rendering for directive-specific (roadmap, status) and act-proposal-specific (file link, signature count, mObywatel button, notification button, and an integrated `DiscussionSection`) information.
*   **`src/components/Roadmap.tsx`**: Renders the legislation process roadmap with clickable steps and expandable details, now conditionally displayed only for directives.
*   **`src/components/SearchBar.tsx`**: The search input component, including property suggestion buttons and the dynamic suggestion popup.
*   **`src/components/Comment.tsx`**: A new component for displaying individual comments, including author, timestamp, content, vote buttons, and recursively rendering replies.
*   **`src/components/DiscussionSection.tsx`**: A new component that manages the state of discussions, provides an input box for new comments/replies, and renders the tree-like view of comments.
*   **`src/types.ts`**: Defines the `Directive` type, and now includes new `User` and `Comment` types for the discussion features.
*   **`src/mockData.ts`**: Provides sample data for directives.
*   **`src/mockActProposals.ts`**: Provides sample data for act proposals (newly added).
*   **`src/mockDiscussions.ts`**: Provides mock data for the interactive discussion section (newly added).
*   **`src/legislationSteps.ts`**: Defines the static steps of the Polish legislation process.
*   **`src/App.css`**: Contains all styling for the application, including layout, cards, roadmap, search bar, suggestions, new styles for page navigation, act proposals, the mObywatel signing button, notification button, the discussion section components (input area, comments, replies), and main content container for proper side-by-side display (updated).
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
