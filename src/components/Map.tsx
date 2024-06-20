import { useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Overlay from 'ol/Overlay';
import Icon from 'ol/style/Icon';
import { fromLonLat } from 'ol/proj.js';
import { toLonLat } from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate.js';
import 'ol/ol.css';
import markerImage from '../assets/cup-soda-png.png';

// stores
import { useSelector } from 'react-redux';

export default function MapComponent() {
	const stores = useSelector((state: any) => state.stores.stores);

	// elements of the popup
	const container = document.getElementById('popup');
	const content = document.getElementById('popup-content');
	const closer = document.getElementById('popup-closer');

	console.log(stores);

	// get store coordinates fromLonLat method
	/* const storeCoordinates = stores.map((store: any) => {
		fromLonLat([store.longitude, store.latitude]);
		console.log(fromLonLat([store.longitude, store.latitude]));
	}); */

	// components NEEDS to mount before map is rendered
	useEffect(() => {
		// marker coordinates (stores)
		//? all coordinates should be the lat and long properties of each store object

		const markerFeatures = stores.map((store: any) => {
			const coords = fromLonLat([store.longitude, store.latitude]);
			return new Feature({
				geometry: new Point(coords),
				storeId: store.id, // Assuming each store has an id
			});
		});

		console.log(markerFeatures);

		// vector source
		const vectorSource = new VectorSource({
			features: markerFeatures,
		});

		// marker styling
		const markerStyle = new Style({
			image: new Icon({
				anchor: [0.5, 1],
				src: markerImage,
			}),
		});

		// vector layer
		const vectorLayer = new VectorLayer({
			source: vectorSource,
			style: markerStyle,
		});

		// lisbon coordinates (change this later)
		const lisbonCoordinates = fromLonLat([-9.139, 38.722]);

		// popup overlay
		const overlay = new Overlay({
			element: container !== null ? container : undefined,
			autoPan: {
				animation: {
					duration: 250,
				},
			},
		});
		// click handler to hide popup

		if (closer) {
			closer.onclick = function () {
				overlay.setPosition(undefined);
				closer.blur();
				return false;
			};
		}

		// map
		const map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				vectorLayer,
			],
			overlays: [overlay],
			view: new View({
				center: lisbonCoordinates,
				zoom: 10,
			}),
		});

		// click handler to show popup on store icon click
		map.on('singleclick', function (evt) {
			const pixel = evt.pixel;
			let isStoreClicked = false;

			map.forEachFeatureAtPixel(pixel, function (feature) {
				// check if the clicked feature is a store
				if (feature.get('storeId')) {
					isStoreClicked = true;
					const geometry = feature.getGeometry();
					if (geometry instanceof Point) {
						const coordinate = geometry.getCoordinates();
						const hdms = toStringHDMS(toLonLat(coordinate));
						content!.innerHTML = '<p class="bg-white p-4 bg-opacity-75">You clicked on a store:</p><code>' + hdms + '</code>';
						overlay.setPosition(coordinate);
					}
					return true; // stop checking features after finding the first store
				}
			});

			if (!isStoreClicked) {
				// Optionally handle clicks outside of store icons
				overlay.setPosition(undefined); // Hide popup
			}
		});

		return () => map.setTarget(null!); //map
	}, []);

	return (
		<div id='map' className='min-h-screen min-w-full' style={{ width: '100%', height: '500px' }}>
			<div id='popup' className='ol-popup'>
				<a href='#' id='popup-closer' className='ol-popup-closer'></a>
				<div id='popup-content'></div>
			</div>
		</div>
	);
}
