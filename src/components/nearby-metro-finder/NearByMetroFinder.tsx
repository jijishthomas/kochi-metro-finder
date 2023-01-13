import React, { useState } from "react";
import Map from '../map/Map';
import KochiMetroMap from './../kochi-metro-map/KochiMetroMap';
import DraggableMap from "../draggable-map/DraggableMap";
import SpatialCalculationsService from './../../helper-functions/SpatialCalculations';
import GetGeolocation from "../../helper-functions/GetGeoLocation2";

import './styles.css'
interface Closest {
    name: string;
    lat: number;
    lng: number;
    link: string;
    distance: number;
}

interface MetroData {
    name: string;
    lat: number;
    lng: number;
    id: number;
}

interface MetroDatasArray extends Array<MetroData> { }

const NearByMetroFinder = () => {
    console.log(window.location.pathname);
    let coordinateSerach = "0";
    if (window.location.pathname === '/find-metro-by-coordinates') {
        coordinateSerach = "1"
    }
    const [isLocationSearch, setIsLocationSearch] = useState(coordinateSerach);
    const [lat, setLat] = useState('10.109988');
    const [lng, setLng] = useState('76.349508');
    const [closest, setClosest] = useState<Closest>();

    const [latnLng, setLatnLng] = useState({});


    const onChangeLat = (e: any) => {
        setLat(e.target.value);
    }

    const onChangeLng = (e: any) => {
        setLng(e.target.value);
    }

    const renderClosestMetroStation = () => {
        return (
            <>
                {closest && (
                    <>
                        <h4>{closest.name} is the nearest metro station! <a href={closest.link} target="_blank">Get directions</a></h4>

                    </>)
                }
            </>
        )
    }

    const findNearbyMS = () => {
        document.getElementById("searchButtonCBS").classList.add('button--loading');
        setTimeout(() => {
            setClosest(SpatialCalculationsService(lat, lng));
            document.getElementById("searchButtonCBS").classList.remove('button--loading');
        }, 1000)
    }

    const alertUser = (msg) => {
        alert(msg);
    }

    function showPosition(position) {
        let latnLngObj = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setLatnLng(latnLngObj)
    }


    // const getLocationAndFindNearbyMS = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(showPosition, showError);
    //     } else {
    //         alertUser("Geolocation is not supported by this browser.");
    //     }

    //     setTimeout(() => {
    //         console.log(latnLng);
    //         setClosest(SpatialCalculationsService(latnLng.lat, latnLng.lng));
    //     }, 3500);
    // }

    const getCoordinates = () => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    const getAddress = async () => {
        // notice, no then(), cause await would block and
        // wait for the resolved result
        try {
            const position = await getCoordinates();
            setClosest(SpatialCalculationsService(position.coords.latitude, position.coords.longitude));
        } catch (error) {
            showError(error)
        }
    }

    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alertUser("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alertUser("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alertUser("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alertUser("An unknown error occurred.");
                break;
        }
    }

    const renderCoordinateBasedSearch = () => {
        return (
            <>
                <div className="center">
                    <div className="form__group field ">
                        <input type="input" className="form__field" placeholder="lat" name="lat" id='lat' value={lat} onChange={onChangeLat} required />
                        <label htmlFor="lat" className="form__label">Lat</label>
                    </div>
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="lng" name="lng" id='lng' value={lng} onChange={onChangeLng} required />
                        <label htmlFor="lng" className="form__label">Lng</label>
                    </div>
                    <br />
                    <button type="button" className="button" id="searchButtonCBS" onClick={findNearbyMS}>
                        <span className="button__text">Search Nearby Metro</span>
                    </button>

                </div>
            </>
        )
    }

    const renderLocationBasedSearch = () => {
        return (
            <>
                <div className="center">
                    <button type="button" className="button p-2" id="searchButtonCBS" onClick={getAddress}>
                        <span className="button__text">  <div className="pin"></div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Find My Nearby Metro</span>
                    </button>
                </div>
            </>
        )
    }

    const toggleSwitch = (e) => {
        console.log(isLocationSearch);
        setClosest(undefined)
        setIsLocationSearch(e.target.value);
    }

    const renderFlipSwitch = () => {
        return (
            <>
                <div className="flex-container">
                    <div className="card">
                        {/* <span></span>
                        <label className="toggle">
                            <input className="toggle-checkbox" type="checkbox" onChange={toggleSwitch} />
                            <div className="toggle-switch"></div>
                        </label>
                        <span></span> */}

                        <ul className="list">

                            <li className="list__item">
                                <input type="radio" className="radio-btn" value="0" checked={isLocationSearch === "0"} onChange={toggleSwitch} name="choice" id="c-opt" />
                                <label htmlFor="c-opt" className="label">Find Nearby Metro using my current Location</label>
                            </li>
                            <li className="list__item">
                                <input type="radio" className="radio-btn" value="1" checked={isLocationSearch === "1"} onChange={toggleSwitch} name="choice" id="d-opt" />
                                <label htmlFor="d-opt" className="label">Find Nearby Metro by entering cordinates</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }


    return (
        <>
            {renderFlipSwitch()}
            <br />
            <br />
            <br />
            <div className="card">
                {isLocationSearch === "1" ? renderCoordinateBasedSearch() : renderLocationBasedSearch()}
                {closest && (
                    <>
                        <div className="card mt-5">
                            {renderClosestMetroStation()}
                            < Map markers={closest} />
                        </div>
                    </>
                )
                }

                {/* < KochiMetroMap markers={metrosInKochi} /> */}
            </div>
        </>
    )
}

export default NearByMetroFinder;