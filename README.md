# General Information

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

This is the frontend for the [BubbleMap](https://github.com/SebilleK/BubbleMap) project.
It is using the React + Vite template found [here](https://github.com/SebilleK/bun-shadcnreact).

Currently under development.

## Quickstart

```bash
bun i
bun run dev
```

Make sure the backend and the database are BOTH running.
See **src/api/axiosInstance.ts** to set correct URL for the backend.

---

# Extra Information

![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

Used React Redux to manage the app state. See **Src/store** for all slices: authSlice handles user information, reviewsSlice handles reviews and storesSlice handles stores.

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

Used React Router for routing.

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui%20%20-8A2BE2?link=https://ui.shadcn.com/)

TailwindCSS classes are used for styling and shadcn/ui pre-made components were used in all pages. They are present in **src/components/ui**

## Attributions

- Map markers Icon: https://lucide.dev/icons/cup-soda **"Soda Cup" icon on Lucide**
- Background image for some pages: https://unsplash.com/photos/clear-plastic-container-dHQQv-BKTjo by **Orimi Protograph on Unplash**
- Bubble Tea "BubbleMap" Logo: https://www.flaticon.com/free-icons/bubble-tea by **Luvdat on Flaticon**

## More

1. Using the defined Axios instance in **src/api/axiosInstance.ts**, custom API requests to the backend are all defined in **src/api/utils/requests.ts**. These are used throughout the components as needed, and as a way of centralizing this utility without cramping the components with request definitions, so it contributes a little towards some modularity and better consistency.

2. In a similar fashion, instead of over-fetching information from the backend, the actions set in the redux slices are dispatched to update information when needed within the frontend (in accordance to any PUT/DELETE requests). As such, the frontend state matches the server data without the need for extra requests.

3. ReactStrictMode was disabled to prevent double component rendering and double requests. Specifically here, this was not only unnecessary but resulted in some errors such as GET /stores (in Homepage) or GET /reviews (in Profile) being called twice and the MapComponent in Map to be rendered twice on the page (in Homepage).

You can disable it by removing the <React.StrictMode> tag in **main.tsx**:

- Source: https://support.boldreports.com/kb/article/12888/how-to-prevent-methods-from-being-called-twice-in-react

4. As of now, the Map component is a bit messy. It needs to be adapted to better adhere to React's way of doing things. Either way, these were important resources in implementing it in its barebones state:

- https://mxd.codes/articles/how-to-create-a-web-map-with-open-layers-and-react
- https://openlayers.org/en/latest/examples/popup.html

---

Non-comprehensive done and to-do list

**Implemented:**

- Users can create an account and login with it (or an existing one in the db)
- Logged in users have access to their profile and can update their personal info
- Profile page has user reviews and they are also editable
- Better modularity: centralized API requests + slices/actions use for managing App state
- Homepage has a map that displays all Stores as markers, they are clickable (buggy for now)

**To implement:**

**General optimization**

- Close editing menus on submit (profile page)
- Remove DOM nesting errors?
- Fix direct DOM manipulation on Map component, needs a React approach. Fix marker bugs..

**Homepage**

- Browsing reviews per store (and adding reviews)

**Styling optimization**

- Nicer color scheme
- Add a theme switcher for dark theme
- Better layout on profile page, also on homepage
