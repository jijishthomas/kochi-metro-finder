import { LatLngExpression } from "leaflet";
import React from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { metrosInKochi } from "../../helper-functions/SpatialCalculations";

const KochiMetroMap = () => {
    const markers = metrosInKochi;
    markers.forEach((element) => {
        element.link = `https://www.google.com/maps/dir//${element.lat},${element.lng}`;
    });
    const textCenter = {
        textAlign: "center"
    };
    const fillBlueOptions = { fillColor: 'blue' };

    const renderMarkers = () => {
        return (
            <>
                {markers && markers.map((item) => {
                    return (
                        <Marker key={item.id} position={[item.lat, item.lng]}>
                            <Popup>
                                <p>{item.name} Metro Station</p>
                                <a href={item.link} target="_blank">Get directions</a>
                            </Popup>
                            <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>
                                {item.name}
                            </Tooltip>
                        </Marker>)
                })
                }
            </>
        )
    }

    const renderPolygon = () => {
        let data: LatLngExpression[] | any[][] = [];
        if (markers && markers.length > 0) {
            markers.forEach((markerData: { lat: any | number; lng: any | number; }) => {
                data.push([
                    markerData.lat, markerData.lng
                ])
            });
            return (
                <>
                    <Polyline pathOptions={fillBlueOptions} positions={data} />

                </>
            )
        }
    }
    return (
        <>
            <h1 style={textCenter}>All Metro stations and route map of Kochi Metro</h1>
            <MapContainer center={[10.025106, 76.308456]} zoom={14} scrollWheelZoom={false} style={{ height: "90vh" }} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {renderMarkers()}
                {/* {renderPolygon()} */}
            </MapContainer>
        </>
    )
}

export default KochiMetroMap;
