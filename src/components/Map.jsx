import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCities } from "../contexts/CityContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";

import PropTypes from "prop-types";

import styles from "./Map.module.css";

// eslint-disable-next-line react/prop-types
function Map({ isCollapsed, handleCollapse }) {
  const { cities } = useCities();

  const [mapLat, mapLng] = useUrlPosition();

  const {
    position: geoPosition,
    getPosition,
    isLoading: isLoadingPosition,
  } = useGeolocation();

  // loading the map in a random location!!!
  const [mapPosition, setMapPosition] = useState([40, 0]);

  // to stay in sync when we leave the selected city back
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  // to stay in sync with the geolocation
  useEffect(() => {
    if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={9}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.emoji} {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick
          isCollapsed={isCollapsed}
          handleCollapse={handleCollapse}
        />
      </MapContainer>
    </div>
  );
}

// Type checking
ChangeCenter.propTypes = {
  position: PropTypes.array,
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick({ isCollapsed, handleCollapse }) {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      if (isCollapsed) handleCollapse();
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
