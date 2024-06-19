# General Information

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

This is the frontend for the [BubbleMap](https://github.com/SebilleK/BubbleMap) project.
It is using the React + Vite template found [here](https://github.com/SebilleK/bun-shadcnreact).

![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

Used React Redux to manage the app state. See **Src/store** for all slices: authSlice handles user information, reviewsSlice handles reviews and storesSlice handles stores.

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

Used React Router for routing.

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui%20%20-8A2BE2?link=https://ui.shadcn.com/)

TailwindCSS classes are used for styling and shadcn/ui pre-made components were used in all pages. They are present in **src/components/ui**

## More

Using the defined Axios instance in **src/api/axiosInstance.ts**, custom API requests to the backend are all defined in **src/api/utils/requests.ts**. These are used throughout the components as needed, and as a way of centralizing this utility without cramping the components with request definitions, so it contributes a little towards some modularity and better consistency.

In a similar fashion, instead of over-fetching information from the backend, the actions set in the redux slices are dispatched to update information when needed within the frontend (in accordance to any PUT/DELETE requests). As such, the frontend state matches the server data without the need for extra requests.

---

Currently under development.

# Quickstart

```bash
bun i
bun run dev
```

Make sure the backend and the database are BOTH running.
See **src/api/axiosInstance.ts** to set correct URL for the backend.

---

Non-comprehensive done and to-do list

**Implemented:**

- Users can create an account and login with it (or an existing one in the db)
- Logged in users have access to their profile and can update their personal info
- Profile page has user reviews and they are also editable
- Better modularity: centralized API requests + slices/actions use for managing App state

**To implement:**

**General optimization**

- Close editing menus on submit (profile page)
- Remove DOM nesting errors?

**Homepage**

- Implement the Homepage map
- Browsing reviews per store (and adding reviews)

**Styling optimization**

- Navbar overhaul
- Nicer color scheme
- Remove the background image
- Add a theme switcher for dark theme
- Better layout on profile page
