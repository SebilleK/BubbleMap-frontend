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

**Implemented:**

- Users can create an account and login with it (or an existing one in the db)
- Logged in users have access to their profile
- Logout works by eliminating the authCookie set by the backend for Authentication purposes (and setting state as logged out for UI changes)

**To implement:**

- Users can update their own info on Profile page
- Browsing reviews per store (and adding reviews)
- Profile page has user reviews (which are able to be edited)
- Styling changes to all pages
- Implement the Homepage map
