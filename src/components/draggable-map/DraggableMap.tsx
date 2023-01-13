import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Polygon, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet'
import SpatialCalculationsService from './../../helper-functions/SpatialCalculations';
import * as L from "leaflet";

const DraggableMap = () => {
    const fillBlueOptions = { fillColor: 'blue' };
    const limeOptions = { color: 'lime' }
    const polygon = [
        [51.515, -0.09],
        [51.52, -0.1],
    ];
    const textCenter = {
        textAlign: "center"
    };
    const [nearestMetroMarkerLatLng, setNearestMetroMarkerLatLng] = useState(null);
    const [nearestMetroMarkerDetails, setNearestMetroMarkerDetails] = useState(null);
    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const [position, setPosition] = useState({
        lat: 10.025106,
        lng: 76.308456,
    })

    const NearestMetroMarker = () => {
        if (nearestMetroMarkerLatLng && nearestMetroMarkerDetails) {
            return (
                <Marker position={nearestMetroMarkerLatLng!} icon={greenIcon}>
                    <Tooltip direction="left" offset={[0, 0]} opacity={1} permanent >{nearestMetroMarkerDetails.name} Metro Station
                    </Tooltip>
                    <Popup>
                        <p>{nearestMetroMarkerDetails.name} Metro Station</p>
                        <a href={nearestMetroMarkerDetails.link} target="_blank">Get directions</a>
                    </Popup>
                </Marker>
            )
        }
    }

    function DraggableMarker() {
        const markerRef = useRef(null)
        const eventHandlers = useMemo(
            () => ({
                dragend() {
                    const marker = markerRef.current;
                    if (marker != null) {
                        setPosition(marker._latlng);
                        const nearest = SpatialCalculationsService(marker._latlng.lat, marker._latlng.lng);
                        const nearestMetroMarkerLatLngObj = {
                            lat: nearest.lat,
                            lng: nearest.lng
                        }
                        const nearestMetroMarkerDetails = {
                            name: nearest.name,
                            link: nearest.link
                        }
                        setNearestMetroMarkerLatLng(nearestMetroMarkerLatLngObj);
                        setNearestMetroMarkerDetails(nearestMetroMarkerDetails);
                    }
                },
            }),
            [],
        )
        return (
            <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup>
                    Click and Drag to the location you need
                </Popup>
            </Marker>
        )
    }

    const center = {
        lat: 10.025106,
        lng: 76.308456,
    }

    return (
        <>
            <h1 style={textCenter}>Click and Drag the marker</h1>
            <MapContainer center={center} zoom={15} scrollWheelZoom={true} style={{ height: "100vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DraggableMarker />
                <NearestMetroMarker />
            </MapContainer>,
        </>
    )
}

export default DraggableMap;
