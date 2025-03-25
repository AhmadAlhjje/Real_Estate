import React from "react";
import { FaExpand } from "react-icons/fa";
import MapComponent from "../../components/MapComponent/MapComponent";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {BASE_URL} from '../../api/api'
// import "./PropertyDetails.css";

const PropertyMedia = ({ property }) => {
  const images = property.images.map((imagePath) => ({
    original: `${BASE_URL}${imagePath}`,
    thumbnail: `${BASE_URL}${imagePath}`,
  }));

  return (
    <div className="row mt-4 mb-4">
      {/* القسم الأيمن - الفيديو والخريطة */}
      <div className="col-md-4 d-flex flex-column gap-3">
        {/* صندوق الفيديو */}
        <div
          className="video-box"
          onClick={() => window.open(property.video, "_blank")}
        >
          <img
            src={`${BASE_URL}${property.images[0]}`}
            alt="Video Thumbnail"
            className="w-100 h-100 object-fit-cover"
          />
          <div className="video-overlay">▶️ مشاهدة جولة بالفيديو</div>
        </div>

        {/* صندوق الخريطة */}
        <div className="map-box">
          <MapComponent
            lat={property.latitude}
            lng={property.longitude}
            title={property.title}
          />
        </div>
      </div>

      {/* القسم الأيسر - عرض الصور باستخدام ImageGallery */}
      <div className="col-md-8 mt-4 mt-md-0">
        <div className="gallery-box">
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={true}
            useBrowserFullscreen={true}
            showThumbnails={true}
            slideDuration={450}
            slideInterval={2000}
            additionalClass="custom-gallery"
            renderFullscreenButton={(onClick) => (
              <button className="fullscreen-button" onClick={onClick}>
                <FaExpand size={20} />
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyMedia;