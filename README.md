# Info

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui%20%20-8A2BE2?link=https://ui.shadcn.com/)

---

This is the frontend for the [BubbleMap](https://github.com/SebilleK/BubbleMap) project.
It is using the React + Vite template found [here](https://github.com/SebilleK/bun-shadcnreact).

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

**To implement:**

**General optimization**

- Close editing menus on submit (profile page)
- Better Redux use. Add slices and actions for updating and relying on the local state instead of fetching data from the backend all the time.
- Better modularity: add utils functions for common requests

**Homepage**

- Implement the Homepage map
- Browsing reviews per store (and adding reviews)

**Styling optimization**

- Navbar overhaul
- Footer can't compromise responsive?
- Nicer color scheme
- Remove the background image
- Add a theme switcher for dark theme
- Better layout on profile page
