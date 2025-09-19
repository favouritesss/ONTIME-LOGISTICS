"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function TrackingMap({ events = [] }) {
  const last = events && events.length > 0 ? events[0] : null;
  const center = last && last.lat && last.lon ? [last.lat, last.lon] : [51.5074, -0.1278];

  return (
    <div className="h-64 w-full">
      <MapContainer center={center} zoom={6} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((ev, idx) => ev.lat && ev.lon ? (
          <Marker key={idx} position={[ev.lat, ev.lon]}>
            <Popup>
              <div>
                <strong>{ev.statusCode}</strong><br/>
                {ev.city}, {ev.country}<br/>
                {new Date(ev.scannedAt).toLocaleString()}
              </div>
            </Popup>
          </Marker>
        ) : null)}
      </MapContainer>
    </div>
  );
}
