import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import MapComponent from "../../components/AddMap/AddMap";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { addRealEstate } from "../../api/RealeStateApi";
import { getUserIdFromToken } from "../../api/api";

const AddProperty = () => {
  // حالة لتخزين بيانات النموذج الخاص بإضافة العقار
  const [formData, setFormData] = useState({
    title: "",
    type: "بيع",
    category: "شقة",
    city: "",
    area: "",
    price: "",
    rooms: "",
    bathrooms: "",
    rentType: "شهري",
    images: [],
    video: null,
    description: "",
    location: null,
  });

  const [previewImages, setPreviewImages] = useState([]); // حالة لمعاينة الصور المرفوعة

  // دالة لتحديث الحقول النصية في النموذج
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // دالة لمعالجة رفع الملفات (صور وفيديو)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      const imagesArray = Array.from(files); // تحويل الصور إلى مصفوفة
      setFormData({ ...formData, images: imagesArray }); // تحديث حالة الصور

      // عرض معاينة الصور
      const previews = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result); // إضافة الصورة إلى قائمة المعاينات
          setPreviewImages(previews);
        };
        reader.readAsDataURL(files[i]); // قراءة الملف كـ Data URL
      }
    } else if (name === "video") {
      setFormData({ ...formData, video: files[0] }); // تحديث حالة الفيديو
    }
  };

  // دالة لتحديد الموقع الجغرافي للعقار
  const handleLocationSelect = (location) => {
    setFormData({ ...formData, location }); // تحديث الموقع الجغرافي
  };

  // دالة لإرسال البيانات إلى الـ API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من صحة البيانات
    if (
      !formData.title ||
      !formData.city ||
      !formData.area ||
      !formData.price ||
      !formData.rooms ||
      !formData.bathrooms ||
      formData.images.length < 2
    ) {
      alert("يرجى ملء جميع الحقول المطلوبة ورفع صورتين على الأقل.");
      return;
    }
    if (formData.type === "إيجار" && !formData.rentType) {
      alert("يرجى اختيار نوع الإيجار.");
      return;
    }

    // الحصول على معرّف المالك من التوكن
    const ownerId = getUserIdFromToken();
    if (!ownerId) {
      alert("حدث خطأ أثناء استخراج معرف المستخدم. يرجى تسجيل الدخول مرة أخرى.");
      return;
    }

    // إعداد بيانات النموذج لإرسالها إلى الـ API
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("subcategory", formData.category);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("area", formData.area);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("rooms", formData.rooms);
    formDataToSend.append("bathrooms", formData.bathrooms);
    if (formData.type === "إيجار") {
      formDataToSend.append("rent_type", formData.rentType);
    }

    // إرسال الصور كحقل واحد (مصفوفة)
    formData.images.forEach((image) => {
      formDataToSend.append("images", image); // إضافة كل صورة تحت اسم "images[]"
    });

    // إضافة الفيديو إذا كان موجودًا
    if (formData.video) {
      formDataToSend.append("videos", formData.video); // إضافة الفيديو تحت اسم "videos"
    }

    // إضافة الوصف والموقع الجغرافي ومعرّف المالك
    formDataToSend.append("description", formData.description);
    if (formData.location) {
      formDataToSend.append("latitude", formData.location.lat); // إضافة خط العرض
      formDataToSend.append("longitude", formData.location.lng); // إضافة خط الطول
    }
    formDataToSend.append("owner_id", ownerId); // إضافة معرّف المالك

    try {
      // إرسال البيانات إلى الـ API
      const response = await addRealEstate(formDataToSend);
      console.log("تمت إضافة العقار بنجاح:", response);
      alert("تمت إضافة العقار بنجاح!");
    } catch (error) {
      console.error("حدث خطأ أثناء إضافة العقار:", error);
      alert("حدث خطأ أثناء إضافة العقار. يرجى المحاولة لاحقًا.");
    }
  };

  // دالة لإزالة صورة من القائمة
  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1); // حذف الصورة من القائمة
    setFormData({ ...formData, images: updatedImages });
    setPreviewImages(previewImages.filter((_, i) => i !== index)); // تحديث معاينة الصور
  };

  // دالة لإزالة الفيديو
  const removeVideo = () => {
    setFormData({ ...formData, video: null }); // إزالة الفيديو من الحالة
  };

  return (
    <Container dir="rtl" className="mb-4">
      <h2 className="my-4 text-start">إضافة عقار</h2>
      <Form onSubmit={handleSubmit}>
        {/* الحقول النصية */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>عنوان العقار</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>نوع العقار</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="بيع">بيع</option>
                <option value="إيجار">إيجار</option>
                <option value="مشاريع">مشاريع</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {formData.type === "إيجار" && (
            <Col md={6}>
              <Form.Group className="mb-3 text-start">
                <Form.Label>نوع الإيجار</Form.Label>
                <Form.Select
                  name="rentType"
                  value={formData.rentType}
                  onChange={handleChange}
                >
                  <option value="شهري">شهري</option>
                  <option value="سنوي">سنوي</option>
                </Form.Select>
              </Form.Group>
            </Col>
          )}
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>نوع العقار داخل التصنيف</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="شقة">شقة</option>
                <option value="منزل">منزل</option>
                <option value="قصر">قصر</option>
                <option value="فيلا">فيلا</option>
                <option value="مكتب">مكتب</option>
                <option value="عيادة">عيادة</option>
                <option value="متجر">متجر</option>
                <option value="مطعم">مطعم</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>المدينة</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>المساحة (م²)</Form.Label>
              <Form.Control
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>السعر</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>عدد الغرف</Form.Label>
              <Form.Control
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>عدد الحمامات</Form.Label>
              <Form.Control
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        {/* رفع الصور والفيديو */}
        <Form.Group className="mb-3 text-start">
          <Form.Label>إضافة صور</Form.Label>
          <Form.Control
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <div style={{ marginTop: "10px" }}>
            {previewImages.map((src, index) => (
              <div key={index} style={{ display: "inline-block", position: "relative" }}>
                <img src={src} alt={`Image ${index}`} style={{ maxWidth: "100px", margin: "5px" }} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "2px",
                    borderRadius: "50%",
                    fontSize: "12px",
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label>إضافة فيديو</Form.Label>
          <Form.Control
            type="file"
            name="video"
            accept="video/*"
            onChange={handleFileChange}
          />
          {formData.video && (
            <div style={{ marginTop: "10px" }}>
              <p>{formData.video.name}</p>
              <button
                type="button"
                onClick={removeVideo}
                style={{ background: "red", color: "white", border: "none", padding: "5px" }}
              >
                إزالة الفيديو
              </button>
            </div>
          )}
        </Form.Group>
        {/* الوصف والموقع */}
        <Form.Group className="mb-3 text-start">
          <Form.Label>وصف العقار</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label>تحديد موقع العقار</Form.Label>
          <MapComponent onLocationSelect={handleLocationSelect} />
        </Form.Group>
        {/* زر الإرسال */}
        <Button variant="primary" type="submit">
          إضافة العقار
        </Button>
      </Form>
    </Container>
  );
};

export default AddProperty;