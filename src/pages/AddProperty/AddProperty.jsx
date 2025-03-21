import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import MapComponent from "../../components/AddMap/AddMap";
import "bootstrap/dist/css/bootstrap.rtl.min.css";

const AddProperty = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
    } else if (name === "video") {
      setFormData({ ...formData, video: files[0] });
    }
  };

  const handleLocationSelect = (location) => {
    setFormData({ ...formData, location });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property Data:", formData);
  };

  return (
    <Container dir="rtl" className="mb-4">
      <h2 className="my-4 text-start" >إضافة عقار</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>عنوان العقار</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>نوع العقار</Form.Label>
              <Form.Select name="type" value={formData.type} onChange={handleChange}>
                <option value="بيع">بيع</option>
                <option value="اجار">إجار</option>
                <option value="مشروع">مشروع</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {formData.type === "اجار" && (
            <Col md={6}>
              <Form.Group className="mb-3 text-start">
                <Form.Label>نوع الإجار</Form.Label>
                <Form.Select name="rentType" value={formData.rentType} onChange={handleChange}>
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
              <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>المدينة</Form.Label>
              <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>المساحة (م²)</Form.Label>
              <Form.Control type="number" name="area" value={formData.area} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>السعر</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>عدد الغرف</Form.Label>
              <Form.Control type="number" name="rooms" value={formData.rooms} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>عدد الحمامات</Form.Label>
              <Form.Control type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3 text-start">
          <Form.Label>إضافة صور</Form.Label>
          <Form.Control type="file" name="images" multiple accept="image/*" onChange={handleFileChange} />
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label>إضافة فيديو</Form.Label>
          <Form.Control type="file" name="video" accept="video/*" onChange={handleFileChange} />
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label>وصف العقار</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} rows={3} />
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label>تحديد موقع العقار</Form.Label>
          <MapComponent onLocationSelect={handleLocationSelect} />
        </Form.Group>
        <Button variant="primary" type="submit">إضافة العقار</Button>
      </Form>
    </Container>
  );
};

export default AddProperty;
