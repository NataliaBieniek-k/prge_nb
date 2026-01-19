import React, { useRef, useEffect } from 'react';
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import OSM from "ol/source/OSM";
import {useGeographic} from "ol/proj";
import "ol/ol.css"
import {TileWMS} from 'ol/source'

function MapComponent(props) {
    const mapRef = useRef(null);

    useGeographic()
    useEffect(() => {
        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),

                new TileLayer({
                    //http://localhost:9000/geoserver/ne/wms?service=WMS&version=1.1.0&request=GetMap&layers=ne%3Acountries&bbox=-180.0%2C-90.0%2C180.0%2C83.64513&width=768&height=370&srs=EPSG%3A4326&styles=&format=application/openlayers
                    source: new TileWMS({
                        url: 'http://localhost:9000/geoserver/ne/wms?',
                        params: {
                            "layers": "ne:countries",
                            "TILED": true,
                        },
                        serverType: "geoserver",
                        transition: 5000,
                    })
                })
            ],


            view: new View({
                center: ([21, 52]),
                zoom: 6,
            })
        });

        return () => {
            map.setTarget(null);
        };
    }, []);

    return (
        <div className="mapComponent" ref={mapRef}></div>
    );
}

export default MapComponent;
