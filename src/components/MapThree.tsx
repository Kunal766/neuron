import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';

import Dot from './dot';

import Ships from './combined_data.json'


const TOKEN = 'pk.eyJ1Ijoia3VuYWxuYXlhazc2NiIsImEiOiJjbHZzNGl2cXQwbnBvMmpxencxcWg4N3g1In0.A48j9JDPZMrj6EHxbc3UuA';
interface Shp { ship_name: string; location_latitude: number; location_longitude: number; heading: number; ec_timestamp: Date; }
function MapThree() {
    const [popupInfo, setPopupInfo] = useState<Shp | null>(null);


    const ports = useMemo(
        () => Ships["ship_1"].map((ship, index) => (
            <Marker
                key={`marker-${index}`}
                longitude={ship.location_longitude}
                latitude={ship.location_latitude}
                anchor="bottom"
                onClick={e => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo(ship);
                }}
            >
                <Dot />
            </Marker>
        ))
        , []
    )

    return (
        <>
            <Map
                initialViewState={{
                    latitude: 40,
                    longitude: -100,
                    zoom: 1,
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
                {ports}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.location_longitude)}
                        latitude={Number(popupInfo.location_latitude)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>
                            Port_Name:{popupInfo.ship_name}
                        </div>
                    </Popup>
                )}
            </Map>
        </>
    );
}

export default MapThree;