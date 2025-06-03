# General Information

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

This is the frontend for the [BubbleMap](https://github.com/SebilleK/BubbleMap) project.

## Quickstart

```bash
bun i
bun run dev
```

Make sure the backend and the database are BOTH running.
See **src/api/axiosInstance.ts** to set correct URL for the backend.

## Deployment

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

~~**Live on Render:**~~**NOT UPDATED**

- https://bubblemap-frontend.onrender.com

![Frontend Homepage](src/assets/frontend-example.gif)

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

- Map markers Icon: https://lucide.dev/icons/store **"Store" icon on Lucide**
- Bubble Tea "BubbleMap" Logo (both variants): https://www.flaticon.com/free-icons/bubble-tea by **Luvdat on Flaticon**

## More: Development Notes

1. Using the defined Axios instance in **src/api/axiosInstance.ts**, custom API requests to the backend are all defined in **src/api/utils/requests.ts**. These are used throughout the components as needed, and as a way of centralizing this utility without cramping the components with request definitions, so it contributes a little towards some modularity and better consistency.

2. In a similar fashion, instead of over-fetching information from the backend, the actions set in the redux slices are dispatched to update information when needed within the frontend (in accordance to any PUT/DELETE requests). As such, the frontend state matches the server data without the need for extra requests.

3. ReactStrictMode was disabled to prevent double component rendering and double requests. Specifically here, this was not only unnecessary but resulted in some errors such as GET /stores (in Homepage) or GET /reviews (in Profile) being called twice and the MapComponent in Map to be rendered twice on the page (in Homepage).

You can disable it by removing the <React.StrictMode> tag in **main.tsx**:

- Source: https://support.boldreports.com/kb/article/12888/how-to-prevent-methods-from-being-called-twice-in-react

4. Open Layers was used for the dynamic map in the homepage. I had a bit of trouble setting it up, so I'll leave some tips below.

```bash
# in "Map.tsx" | src/components

# import the OL styles to avoid behavior issues
import 'ol/ol.css';

# (...)

# don't manipulate the DOM directly: useRef hook
const mapRef = useRef<HTMLDivElement | null>(null);

# (...)

# inside useEffect hook....
# set the target of the mapObj to the map element
mapObj.setTarget(mapRef.current);


# set the target as null again: this avoids issues when unmounting
return () => {
	mapObj.setTarget(null!);
}

# (...)

# set width and height directly to the map element!
return <div id='map' style={{ width: '100%', height: '500px' }} ref={mapRef}></div>;
```

Official OL website:

- https://openlayers.org/

The below resources helped a lot setting this up, and I would recommend checking them out:

**For doing a barebones map initially**

- https://mxd.codes/articles/how-to-create-a-web-map-with-open-layers-and-react
- https://openlayers.org/en/latest/examples/popup.html

**For implementing it as a React component adequately**

- https://medium.com/@pyj0695/how-to-use-openlayers-in-react-e53c52e0ce70
- https://medium.com/swlh/how-to-incorporate-openlayers-maps-into-react-65b411985744 (premium only, source of the previous article)

5. To have the map occupy the entire homepage, I set the Navbar, Store Info and Review Info (displayed on marker click) as fixed elements/components (they are responsive though). This is simpler to me compared to setting them as permanent overlays on the Open Layers map instance (in the Map component).

6. Notes on error alerts

Some error alerts are directly set on the frontend:

```bash
# example found on the ReviewsOnProfile.tsx component
if (reviewText.length < 10 || reviewText.length > 1000) {
	dispatch(setAlertMessage('Please enter a review text with more than 10 characters and less than 500 characters'));
	dispatch(setAlert(true));
	return;
}
```

And others are set according to a dynamic message coming from the backend response. To do this I used additional checking in my try/catch blocks when making a request in a component and checked if the response has a certain property that only an error response would, to then set the error message according to it.

It resulted in a bit of messy code, although it does work:

```bash
# example found in the registering function on the RegisterPage.tsx component
if (response && response.response && response.response.data && response.response.data.name) {
	dispatch(setAlertMessage(response.response.data.message));
	dispatch(setAlert(true));
	return;
} else {
	# proceed with sucessful registration stuff such as redirecting to login....
}
```

The alert (boolean) and alertMessage (string) are in the authSlice.ts present in the store directory. Although not directly correlated, most of the alerts set are result of Login/Registering so it felt appropriate.

7. On the dark theme, instead of changing the Map object itself I applied some filters conditionally, which is a simpler way of providing some adaption to the said theme:

```bash
# found on the Map.tsx component
<div id='map' style={{ width: '100%', height: '100vh', filter: theme === 'dark' ? 'grayscale(50%) brightness(0.8) contrast(1.5)' : 'brightness(1)' }} ref={mapRef}></div>
```

Based on this useful answer:

- https://gis.stackexchange.com/a/475254

---

**Implemented:**

- Users can create an account and login with it (or an existing one in the db)
- Logged in users have access to their profile and can update their personal info
- Profile page has user reviews and they are also editable
- Better modularity: centralized API requests + slices/actions use for managing App state
- Homepage has a map that displays all Stores as markers, they are clickable
- You can browse the reviews per store on the Homepage
- Alerts: on Login (Unregistered email, Wrong password); on Register (Already existing username or email, Password(s) matching & password verifying); on Profile (Invalid reviews update, Invalid user info update)
- Dark Mode
- Admin page: administrators have access to an exclusive page to create new stores, and they can delete/update existing stores as well.
