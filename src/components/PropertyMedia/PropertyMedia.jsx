import React from "react";
import { FaExpand } from "react-icons/fa";
import MapComponent from "../../components/MapComponent/MapComponent";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {BASE_URL} from '../../api/api'

const PropertyMedia = ({ property }) => {

// هذه من اجل الصور ImageGallery
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
            items={images} // قائمة الصور التي سيتم عرضها (تحتوي على المسارات الأصلية والمعاينات)
            showPlayButton={false} // تعطيل زر التشغيل التلقائي للعرض
            showFullscreenButton={true} // تمكين زر الانتقال إلى وضع ملء الشاشة
            useBrowserFullscreen={true} // استخدام خاصية المتصفح لوضع ملء الشاشة
            showThumbnails={true} // عرض الصور المصغرة أسفل المعرض
            slideDuration={450} // مدة الانتقال بين الصور بالمللي ثانية (450 مللي ثانية)
            slideInterval={2000} // الفاصل الزمني بين الصور في العرض التلقائي (2000 مللي ثانية)
            additionalClass="custom-gallery" // إضافة فئة CSS مخصصة لتخصيص تصميم المعرض
            renderFullscreenButton={(onClick) => ( // تخصيص زر ملء الشاشة
            <button className="fullscreen-button" onClick={onClick}>
            {/* أيقونة التوسع باستخدام مكتبة react-icons */}
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