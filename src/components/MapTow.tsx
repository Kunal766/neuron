import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';

import Pin from './pin';
import Posrts from './portsjson.json'


import Dot from './dot';
// import Ships from './combined_data.json'


const TOKEN = 'pk.eyJ1Ijoia3VuYWxuYXlhazc2NiIsImEiOiJjbHZzNGl2cXQwbnBvMmpxencxcWg4N3g1In0.A48j9JDPZMrj6EHxbc3UuA';
interface Ptr { port_name: string; geo_location_latitude: number; geo_location_longitude: number }
interface Shp { ship_name: string; location_latitude: number; location_longitude: number; heading: number; ec_timestamp: Date; }

function MapTwo({ ship_name }) {
    const [popupInfo, setPopupInfo] = useState<Ptr | null>(null);
    const [Ships, setShips] = useState<{ "location_latitude": number, "location_longitude": number }[] | null>(null)


    const ports = useMemo(
        () => Posrts.map((port, index) => (
            <Marker
                key={`marker-${index}`}
                longitude={port.geo_location_longitude}
                latitude={port.geo_location_latitude}
                anchor="bottom"
                onClick={e => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo(port);
                }}
            >
                <Pin />
            </Marker>
        ))
        , []
    )


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://backend2-1-pc9c.onrender.com/api/ship/' + ship_name);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setShips(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();


    }, [ship_name])

    const ships = useMemo(
        () => (Ships && Ships.map((ship, index) => (
            <Marker
                key={`marker-${index}`}
                longitude={ship.location_longitude}
                latitude={ship.location_latitude}
                anchor="bottom"
            >
                <Dot />
            </Marker>
        )))
        , [Ships]
    )

    return (
        <>
            <Map
                initialViewState={{
                    latitude: 40,
                    longitude: -100,
                    zoom: 0,
                    bearing: 0,
                    pitch: 0
                }}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxAccessToken={TOKEN}
                style={{ width: 800, height: 400 }}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />
                {ports}{ships}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.geo_location_longitude)}
                        latitude={Number(popupInfo.geo_location_latitude)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>
                            Port_Name:{popupInfo.port_name}
                        </div>
                    </Popup>
                )}
            </Map>
        </>
    );
}

export default MapTwo;