'use client'
import React from "react";
import { ActivityDetails } from "@/app/lib/types/strava";
import GoogleMapReact from "google-map-react";
import polyline from "@mapbox/polyline";

const ActivityMap = ({ activity }: { activity: ActivityDetails }) => {
  const { start_latlng } = activity;
  
  const handleApiLoaded = (map: any, maps: any) => {
    const decodedPolyline = polyline.decode(activity.map.summary_polyline);
    const path = decodedPolyline.map((point: any) => {
      return { lat: point[0], lng: point[1] };
    });
    const line = new maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    line.setMap(map);
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        }}
        defaultCenter={{ lat: start_latlng[0], lng: start_latlng[1] }}
        defaultZoom={13}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
      </GoogleMapReact>
    </div>
  );
};

export default ActivityMap;
