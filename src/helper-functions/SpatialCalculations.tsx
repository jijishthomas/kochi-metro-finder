import React from "react";

interface MetroDatasArray extends Array<MetroData> { }

interface MetroData {
    name: string;
    lat: number;
    lng: number;
    id: number;
}

export const metrosInKochi: MetroDatasArray = [
    {
        "id": 1,
        "name": "Aluva",
        "lat": 10.109675,
        "lng": 76.349638
    },
    {
        "id": 2,
        "name": "Pulinchodu",
        "lat": 10.09512,
        "lng": 76.346661
    },
    {
        "id": 3,
        "name": "Companypady",
        "lat": 10.087293,
        "lng": 76.34284
    },
    {
        "id": 4,
        "name": "Ambattukavu",
        "lat": 10.079372,
        "lng": 76.339004
    },
    {
        "id": 5,
        "name": "Muttom",
        "lat": 10.072575,
        "lng": 76.333727
    },
    {
        "id": 6,
        "name": "Kalamassery",
        "lat": 10.0584,
        "lng": 76.321926
    },
    {
        "id": 7,
        "name": "Cochin University",
        "lat": 10.046879,
        "lng": 76.318377
    },
    {
        "id": 8,
        "name": "Pathadipalam",
        "lat": 10.035948,
        "lng": 76.314371
    },
    {
        "id": 9,
        "name": "Edapally",
        "lat": 10.025106,
        "lng": 76.308456
    },
    {
        "id": 10,
        "name": "Changampuzha Park",
        "lat": 10.01488,
        "lng": 76.302319
    },
    {
        "id": 11,
        "name": "Palarivattom",
        "lat": 10.006432,
        "lng": 76.304769
    },
    {
        "id": 12,
        "name": "J. L. N. Stadium",
        "lat": 10.006432,
        "lng": 76.304769
    },
    {
        "id": 13,
        "name": "J. L. N. Stadium",
        "lat": 10.000554,
        "lng": 76.299535
    },
    {
        "id": 14,
        "name": "Kaloor",
        "lat": 9.994484,
        "lng": 76.291669
    },
    {
        "id": 15,
        "name": "Town Hall",
        "lat": 9.991247,
        "lng": 76.288035
    },
    {
        "id": 16,
        "name": "M. G. Road",
        "lat": 9.991247,
        "lng": 76.288035
    },
    {
        "id": 17,
        "name": "Maharaja's College",
        "lat": 9.973487,
        "lng": 76.285015
    },
    {
        "id": 18,
        "name": "Ernakulam South",
        "lat": 9.968618,
        "lng": 76.289452
    },
    {
        "id": 19,
        "name": "Kadavanthra",
        "lat": 9.966547,
        "lng": 76.298185
    },
    {
        "id": 20,
        "name": "Elamkulam",
        "lat": 9.967001,
        "lng": 76.307984
    },
    {
        "id": 21,
        "name": "Vyttila",
        "lat": 9.967498,
        "lng": 76.320409
    },
    {
        "id": 22,
        "name": "Thaikoodam",
        "lat": 9.959964,
        "lng": 76.323733
    },
    {
        "id": 23,
        "name": "Pettah",
        "lat": 9.951172,
        "lng": 76.331043
    }
]

const SpatialCalculationsService = (lat, lng) => {
    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180)
    }

    const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    let distances: any = [];
    if (lat && lng) {
        metrosInKochi.forEach(element => {
            distances.push(
                {
                    distance:
                        getDistanceFromLatLonInKm(element.lat, element.lng, Number(lat), Number(lng)),
                    name: element.name,
                    id: element.id,
                    link: `https://www.google.com/maps/dir//${element.lat},${element.lng}`,
                    lat: element.lat,
                    lng: element.lng
                }
            );
        });
    }
    const closest = distances.reduce(
        (acc: { distance: number; }, loc: { distance: number; }) =>
            acc.distance < loc.distance
                ? acc
                : loc
    )
    return closest;
}

export default SpatialCalculationsService;
