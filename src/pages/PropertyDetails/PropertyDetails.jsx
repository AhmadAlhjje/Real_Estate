import React from "react";
import { useParams } from "react-router-dom";
import MapComponent from "../../components/MapComponent/MapComponent";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { FaExpand } from "react-icons/fa"; // أيقونة التوسيع

const properties = [
  {
    id: 2,
    title: "مشروع جاهز للتسليم",
    type: "آجار",
    category: "شقة",
    subCategory: "منزل",
    city: "Aleppo",
    area: 120,
    price: 275000,
    rooms: 3,
    bathrooms: 2,
    livingRooms: 3,
    rentType: "سنوي",
    images: ["/s6.jpg", "/s7.jpg"],
    video: "public/video2.mp4",
    description: "شقة جديدة بتصميم حديث وإطلالة رائعة.",
    views: 250,
    latitude: 36.215,
    longitude: 37.1598,
    addedDate: new Date("2025-03-02T12:00:00"),
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  console.log(id)
  const property = properties.find((p) => p.id === 2);

  if (!property) return <h2 className="text-center">العقار غير موجود</h2>;

  // تحويل الصور إلى الصيغة المطلوبة من مكتبة react-image-gallery
  const images = property.images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <div className="container mt-4">
      {/* عنوان العقار والسعر */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
        <h2 className="fw-bold text-dark">{property.title}</h2>
        <h4 className="text-success">USD {property.price.toLocaleString()}</h4>
      </div>

      {/* تصميم الشبكة */}
      <div className="row mt-4 mb-4">
        {/* القسم الأيمن - الفيديو والخريطة */}
        <div className="col-md-4 d-flex flex-column gap-3">
          <div
            className="rounded-4 shadow-sm position-relative overflow-hidden"
            style={{ height: "190px", cursor: "pointer", borderRadius: "15px" }}
            onClick={() => window.open(property.video, "_blank")}
          >
            <img src={property.images[0]} alt="Video Thumbnail" className="w-100 h-100 object-fit-cover" />
            <div className="position-absolute top-50 start-50 translate-middle bg-dark text-white p-2 rounded" style={{ opacity: 0.8, borderRadius: "10px",width:"150px" }}>
              ▶️ مشاهدة جولة بالفيديو
            </div>
          </div>

          {/* صندوق الخريطة */}
          <div className="rounded-4 shadow-sm overflow-hidden" style={{ height: "190px", borderRadius: "15px" }}>
            <MapComponent lat={property.latitude} lng={property.longitude} title={property.title} />
          </div>
        </div>

        {/* القسم الأيسر - عرض الصور باستخدام ImageGallery */}
        <div className="col-md-8 mt-4 mt-md-0">
          <div className="rounded-4 shadow-sm overflow-hidden position-relative" style={{ borderRadius: "30px", height: "400px" }}>
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={true}
              useBrowserFullscreen={true}
              showThumbnails={true} // إظهار الصور المصغرة
              slideDuration={450} // سرعة الانتقال بين الصور
              slideInterval={2000} // مدة عرض كل صورة
              additionalClass="custom-gallery"
              renderFullscreenButton={(onClick) => (
                <button
                  className="fullscreen-button"
                  onClick={onClick}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(0, 0, 0, 0.6)",
                    border: "none",
                    color: "white",
                    padding: "8px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                >
                  <FaExpand size={20} />
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
