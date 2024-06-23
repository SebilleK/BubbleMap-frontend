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
import markerImage from '../assets/cup-soda-png.png';
import HomepageNavbar from './HomepageNavbar';

import StoreAlert from './StoreAlert';

import { setAlert, setStoreInfo } from '@/store/storesSlice';

import { useDispatch } from 'react-redux';

import { fromLonLat } from 'ol/proj';

// stores
import { useSelector } from 'react-redux';

export default function MapComponent() {
	const dispatch = useDispatch();
	const stores = useSelector((state: any) => state.stores.stores);
	const alertNotif = useSelector((state: any) => state.stores.alert);
	const mapRef = useRef<HTMLDivElement | null>(null);

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
				src: markerImage,
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
		const lisbonCoordinates = fromLonLat([-9.139, 38.722]);

		//? map object
		const mapObj = new Map({
			view: new View({
				center: lisbonCoordinates,
				zoom: 10,
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

			<div id='map' style={{ width: '100%', height: '100vh' }} ref={mapRef}></div>
			{alertNotif && <StoreAlert />}
		</>
	);
}
