import React, { useState } from "react";

 const GetGeolocation = () => {
    const [latnLng, setLatnLng] = useState({});
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

    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alertUser("Geolocation is not supported by this browser.");
    }

    setTimeout(() => {
        console.log(latnLng);
        // return latnLng;

    }, 1000)
}

export default GetGeolocation;
