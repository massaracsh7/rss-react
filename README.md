# Rick and Morty Project

### "Rick and Morty"
"Rick and Morty" is an animated sci-fi comedy series that follows the misadventures of an eccentric and alcoholic scientist, Rick Sanchez, and his good-hearted but easily influenced grandson, Morty Smith. The show blends dark humor with complex storytelling, exploring alternate dimensions, alien worlds, and philosophical dilemmas. Its unique blend of absurdity and wit has made it a cultural phenomenon with a dedicated fanbase.

## About the Project

- **Redux Integration:** The app is built using Redux, integrated with the help of Redux Toolkit.
- **State Management:**
  - **Search:** Search queries are saved in the Redux store.
  - **Pagination:** The number of items per page is stored in the Redux store.
  - **Loading Indicators:** Loading flags are managed in the store, and appropriate loading indicators are shown during data fetches.
- **Data Fetching:** 
  - When the search query or the number of items per page changes, the application automatically triggers a new data fetch using RTK Query.
  - The main page displays the search results, which are dynamically updated based on the user's input and pagination settings.
- **Item Details View:**
  - When an item from the search results is clicked, the page splits into two sections:
    - **Left Section:** Continues to display the search results.
    - **Right Section:** Displays the item details using the Router Outlet.
  - The right section includes:
    - A loading indicator while fetching the details.
    - A control to close the details section.
    - Automatic closure of the section when the user clicks on the left section (search results).
  - The URL is updated to reflect the state of the details section, such as `/?frontpage=2&details=1`.

**Testing:**
- Tests have been modified and extended to cover the Redux and RTK Query functionality, ensuring that all interactions and state changes behave as expected.

## Stack
- **React** 
- **TypeScript**
- **Vite**
- **ESLint**
- **Prettier**
- **Husky**
- **Jest**

## Setting up

1. Clone this repo: 
   ```bash
   $ git clone https://github.com/massaracsh7/rss-react.git

2. Go to the downloaded folder:

   ```bash
   $ cd rss-react

3. Install dependencies:

   ```bash
   $ npm install

4. Run the app in the development mode:

   ```bash
   $ npm run dev

5. Open http://localhost:5173 to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Available Scripts

- **npm run build**: Script to build the app for production to the build folder. Your app is ready to be deployed!
- **npm run preview**: Script to start a local web server that serves the built solution for previewing.
- **npm run test**: Script to launch the test runner in the interactive watch mode.
- **npm run test**:coverage: Script to define what percentage of application code is tested and whether the test cases cover all the code.
- **npm run lint**: Script to launch the ESLint runner in the interactive watch mode.
- **npm run format**: Script to format and make your code nice and readable using Prettier.
- **npm run lint-staged**: Script to run linters on staged changes only, making the process faster and more efficient.
- **npm run prepare:** Script to launch Husky installation, it's launched during the global installation.