import React, { useState } from "react";

const GetGeolocation = () => {

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

    function showError(error) {
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

    const getAddress = async () => {

    }

    const getCoordinates = () => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }


}

export default GetGeolocation;
