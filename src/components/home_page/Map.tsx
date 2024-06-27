import 'ol/ol.css';
import { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Tile } from 'ol/layer';
import { OSM } from 'ol/source';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector';
// import markerImage from '../../assets/cup-soda-png.png';
import HomepageNavbar from '../HomepageNavbar';

import StoreAlert from './StoreAlert';

import { setAlert, setStoreInfo } from '@/store/storesSlice';

import { useDispatch } from 'react-redux';

import { fromLonLat } from 'ol/proj';

// stores
import { useSelector } from 'react-redux';

import { useTheme } from '../../theme/ThemeProvider';

export default function MapComponent() {
	const dispatch = useDispatch();
	const stores = useSelector((state: any) => state.stores.stores);
	const alertNotif = useSelector((state: any) => state.stores.alert);
	const mapRef = useRef<HTMLDivElement | null>(null);

	const { theme } = useTheme();

	// components NEEDS to mount before map is rendered
	useEffect(() => {
		if (!mapRef.current) {
			return;
		}
		console.log(stores);

		//? markers (mapping through stores: each marker is a feature)
		const markerFeatures = stores.map((store: any) => {
			const coords = fromLonLat([store.longitude, store.latitude]);
			return new Feature({
				geometry: new Point(coords),
				storeName: store.name,
				storeAddress: store.address,
				storeDescription: store.description,
				storeId: store.id,
			});
		});

		const markerStyle = new Style({
			image: new Icon({
				/* src: markerImage, */
				src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zdG9yZSI+PHBhdGggZD0ibTIgNyA0LjQxLTQuNDFBMiAyIDAgMCAxIDcuODMgMmg4LjM0YTIgMiAwIDAgMSAxLjQyLjU5TDIyIDciLz48cGF0aCBkPSJNNCAxMnY4YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMnYtOCIvPjxwYXRoIGQ9Ik0xNSAyMnYtNGEyIDIgMCAwIDAtMi0yaC0yYTIgMiAwIDAgMC0yIDJ2NCIvPjxwYXRoIGQ9Ik0yIDdoMjAiLz48cGF0aCBkPSJNMjIgN3YzYTIgMiAwIDAgMS0yIDJhMi43IDIuNyAwIDAgMS0xLjU5LS42My43LjcgMCAwIDAtLjgyIDBBMi43IDIuNyAwIDAgMSAxNiAxMmEyLjcgMi43IDAgMCAxLTEuNTktLjYzLjcuNyAwIDAgMC0uODIgMEEyLjcgMi43IDAgMCAxIDEyIDEyYTIuNyAyLjcgMCAwIDEtMS41OS0uNjMuNy43IDAgMCAwLS44MiAwQTIuNyAyLjcgMCAwIDEgOCAxMmEyLjcgMi43IDAgMCAxLTEuNTktLjYzLjcuNyAwIDAgMC0uODIgMEEyLjcgMi43IDAgMCAxIDQgMTJhMiAyIDAgMCAxLTItMlY3Ii8+PC9zdmc+',
			}),
		});

		const vectorSource = new VectorSource();
		const vectorLayer = new VectorLayer({
			source: vectorSource,
			style: markerStyle,
		});

		//? add marker features to vector source
		vectorSource.addFeatures(markerFeatures);

		//? overlay: navbar

		//? center coordinates
		const lisbonCoordinates = fromLonLat([-9.139, 38.729]);

		//? map object
		const mapObj = new Map({
			view: new View({
				center: lisbonCoordinates,
				zoom: 13,
			}),

			layers: [new Tile({ source: new OSM() }), vectorLayer],
		});

		//? click event listener
		mapObj.on('click', evt => {
			const feature = mapObj.forEachFeatureAtPixel(evt.pixel, feature => {
				return feature;
			});

			if (feature) {
				/* alert(feature.get('storeName') + '\n' + feature.get('storeAddress') + '\n' + feature.get('storeDescription')); */
				const storeId = feature.get('storeId');
				const storeName = feature.get('storeName');
				const storeAddress = feature.get('storeAddress');
				const storeDescription = feature.get('storeDescription');

				dispatch(setStoreInfo({ storeId, storeName, storeAddress, storeDescription }));

				dispatch(setAlert(true));
			}
		});

		//? hover event listener
		mapObj.on('pointermove', evt => {
			const hit = mapObj.hasFeatureAtPixel(evt.pixel);
			mapObj.getTargetElement().style.cursor = hit ? 'pointer' : '';
		});

		//? set map target
		mapObj.setTarget(mapRef.current);

		return () => {
			mapObj.setTarget(null!);
		};
	}, [stores]);

	return (
		<>
			{/* {alertNotif && <StoreAlert />} */}

			<HomepageNavbar />

			<div id='map' style={{ width: '100%', height: '100vh', filter: theme === 'dark' ? 'grayscale(50%) brightness(0.8) contrast(1.5)' : 'brightness(1)' }} ref={mapRef}></div>
			{alertNotif && <StoreAlert />}
		</>
	);
}
