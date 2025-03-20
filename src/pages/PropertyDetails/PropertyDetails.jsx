import React from "react";
import { useParams } from "react-router-dom";
import MapComponent from "../../components/MapComponent/MapComponent";
import "react-image-gallery/styles/css/image-gallery.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


    const settings = {
      dots: true, // عرض النقاط أسفل الصور
      infinite: true, // التمرير اللانهائي
      speed: 500, // سرعة الانتقال بين الصور
      slidesToShow: 1, // عرض صورة واحدة في الوقت
      slidesToScroll: 1, // التمرير صورة واحدة في كل مرة
      arrows: true, // عرض الأسهم للتنقل بين الصور
      fade: true, // التأثير التدريجي بين الصور
    };

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

  return (
    <div className="container mt-4">
      {/* عنوان العقار والسعر */}
      <div style={{display:"flex", justifyContent:"space-between",marginBottom:"40px"}}>
        <h4 className="text-success">USD {property.price.toLocaleString()}</h4>
        <h2 className="fw-bold text-dark">{property.title}</h2>
      </div>

      {/* تصميم الشبكة */}
      <div className="row mt-4 mb-4">
        

        {/* القسم الأيسر - الفيديو والخريطة */}
        <div className="col-md-4 d-flex flex-column gap-3">
          <div
            className="rounded-4 shadow-sm position-relative overflow-hidden"
            style={{ height: "190px", cursor: "pointer", borderRadius: "15px" }}
            onClick={() => window.open(property.video, "_blank")}
          >
            <img
              src={property.images[0]}
              alt="Video Thumbnail"
              className="w-100 h-100 object-fit-cover"
            />
            <div
              className="position-absolute top-50 start-50 translate-middle bg-dark text-white p-2 rounded"
              style={{ opacity: 0.8, borderRadius: "10px" }}
            >
              ▶️ مشاهدة جولة بالفيديو
            </div>
          </div>

          {/* صندوق الخريطة */}
          <div
            className="rounded-4 shadow-sm overflow-hidden"
            style={{ height: "190px", borderRadius: "15px" }}
          >
            <MapComponent lat={property.latitude} lng={property.longitude} title={property.title} />
          </div>
        </div>

        {/* القسم الأيمن - صورة العقار الكبيرة */}
        <div className="col-md-8 mt-4 mt-md-0">
        <div
            className="rounded-4 shadow-sm overflow-hidden"
            style={{
                borderRadius: "30px",
                height: "400px", 
            }}
        >
      <Slider {...settings}>
        {property.images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Image ${index}`}
              style={{ width: "100%", height: "100%"}}
            />
          </div>
        ))}
      </Slider>
    </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;
