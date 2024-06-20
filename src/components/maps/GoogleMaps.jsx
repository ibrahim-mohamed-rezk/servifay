import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent = ({ loc }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC1UfVfzti7tY3L-93Z4XbquF4UYVC-e4g", // Add your API key here
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: loc.latitude, lng: loc.longitude }}
      zoom={10}
    >
      <Marker position={{ lat: loc.latitude, lng: loc.longitude }} />
    </GoogleMap>
  );
};

export default MapComponent;
