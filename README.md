# Info

**WIP**

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
