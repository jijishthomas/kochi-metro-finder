import React from 'react';
import { MapContainer, Marker, Polygon, Popup, TileLayer, useMap } from 'react-leaflet'
import * as L from "leaflet";

var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


const Map = ({ markers }) => {
    const fillBlueOptions = { fillColor: 'blue' };
    const limeOptions = { color: 'lime' }
    const polygon = [
        [51.515, -0.09],
        [51.52, -0.1],
    ];
    return (
        <>
            {markers &&
                <MapContainer center={[markers.lat, markers.lng]} zoom={20} scrollWheelZoom={false} style={{ height: "100vh" }} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[markers.lat, markers.lng]} icon={greenIcon}>
                        <Popup> 
                            {markers.name}
                        </Popup>
                    </Marker>
                    <Polygon pathOptions={fillBlueOptions} positions={polygon} />
                </MapContainer>
            }
        </>
    )
}

export default Map;
