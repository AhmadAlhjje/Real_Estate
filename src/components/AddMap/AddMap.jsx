import { MapContainer, TileLayer} from "react-leaflet";
import LocationMarker from "../LocationMarker/LocationMarker"
import "leaflet/dist/leaflet.css";

// مكون الخريطة
const AddMap = ({ onLocationSelect }) => {
  return (
    <MapContainer center={[33.5138, 36.2765]} zoom={12} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* إضافة مكون تحديد الموقع */}
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
};

export default AddMap;