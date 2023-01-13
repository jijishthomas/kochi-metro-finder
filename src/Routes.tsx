import React from "react"
import { Routes, Route } from "react-router-dom";
import NearByMetroFinder from './components/nearby-metro-finder/NearByMetroFinder';
import KochiMetroMap from "./components/kochi-metro-map/KochiMetroMap";
import DraggableMap from "./components/draggable-map/DraggableMap";

const MapRoutes = () => {
    return (
        <Routes>
            <Route path="/all-kochi-metros-map" element={<KochiMetroMap />} />
            <Route path="/my-nearest-metro" element={<NearByMetroFinder />} />
            <Route path="/nearest-metro-map" element={<DraggableMap />} />
            <Route path="/find-metro-by-coordinates" element={<NearByMetroFinder />} />
        </Routes>
    )
}

export default MapRoutes;