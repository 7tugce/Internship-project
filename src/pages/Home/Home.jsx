import React from "react";
import Sketch from "../../components/Sketch/Sketch";
import "./Home.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { addRequest } from "../../services/requestservice";
import { Link } from "react-router-dom";
import { REQUEST_ROUTE } from "../../routes";
import alertify from "alertifyjs";

const Home = () => {
  const validate = (values) => {
    const errors = {};

    if (!values.date) {
      errors.date = "Tarih gerekli";
    }
    if (!values.submittedBy) {
      errors.submittedBy = "Gönderen Kişi gerekli";
    }
    if (!values.role) {
      errors.role = "Unvan/Rol gerekli";
    }
    if (!values.requirement) {
      errors.requirement = "Gereksinim gerekli";
    }
    if (!values.history) {
      errors.history = "Şu Anki Durum gerekli";
    }
    if (!values.limitations) {
      errors.limitations = "Sınırlamalar gerekli";
    }
    if (!values.approach) {
      errors.approach = "Yaklaşımlar gerekli";
    }
    if (!values.gains) {
      errors.gains = "Kazanımlar gerekli";
    }
    if (!values.sketch) {
      errors.sketch = "Çizim gerekli";
    }

    return errors;
  };

  return (
    <div>
      <Link to={REQUEST_ROUTE}>Daha önceki talepleri görmek için tıklayınız.</Link>
      <Formik
        initialValues={{
          date: "",
          submittedBy: "",
          role: "",
          requirement: "",
          history: "",
          limitations: "",
          approach: "",
          gains: "",
          sketch: "",
        }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          addRequest(values).then((response) => {
           alertify.success("Formunuz gönderildi.");
            setSubmitting(false);
          });
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form className="form" onSubmit={handleSubmit}>
            <div className="top-section">
              <div>
                <label>Tarih:</label>
                <Field type="date" name="date" />
                <ErrorMessage name="date" component="div" className="error" />
              </div>
              <div>
                <label>Gönderen Kişi:</label>
                <Field type="text" name="submittedBy" />
                <ErrorMessage name="submittedBy" component="div" className="error" />
              </div>
              <div>
                <label>Unvan/Rol:</label>
                <Field type="text" name="role" />
                <ErrorMessage name="role" component="div" className="error" />
              </div>
            </div>

            <div className="form-section">
              <div className="first-two-rows">
                <div>
                  <label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="#000000" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                    Gereksinim
                    <span>
                      (Maddeler halinde bu yazılım/servisin çözmeye çalıştığı sorunu veya sağlayacağı fırsatları yazınız.)
                    </span>
                    :
                  </label>
                  <Field as="textarea" name="requirement" />
                  <ErrorMessage name="requirement" component="div" className="error" />
                </div>
                <div>
                  <label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="#000000" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                    Şu Anki Durum
                    <span>(Maddeler halinde şu anki durumu açıklayınız.)</span>:
                  </label>
                  <Field as="textarea" name="history" />
                  <ErrorMessage name="history" component="div" className="error" />
                </div>
              </div>
              <div className="last-three-rows">
                <div>
                  <label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="#000000" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                    Sınırlamalar
                    <span>
                      (Nelerin projenin gelişmesinde engel olacağını listeleyiniz; ekipman eksikliği, özel eğitim eksikliği, bütçe yetersizliği gibi.)
                    </span>
                    :
                  </label>
                  <Field as="textarea" name="limitations" />
                  <ErrorMessage name="limitations" component="div" className="error" />
                </div>
                <div>
                  <label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="#000000" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                    Yaklaşımlar
                    <span>
                      (Projeyi tamamlamak için nelerin gerektiğini listeleyiniz.)
                    </span>
                    :
                  </label>
                  <Field as="textarea" name="approach" />
                  <ErrorMessage name="approach" component="div" className="error" />
                </div>
                <div>
                  <label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path fill="#000000" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
                    </svg>
                    Kazanımlar
                    <span>
                      (Bu projenin organizasyona katacağı ayrıcalıkları maddeler halinde listeleyiniz.)
                    </span>
                  </label>
                  <Field as="textarea" name="gains" />
                  <ErrorMessage name="gains" component="div" className="error" />
                </div>
              </div>
            </div>

            <div className="sketch-section-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="#000000" d="M12 1L9 9l-8 3l8 3l3 8l3-8l8-3l-8-3z" />
              </svg>
              Lütfen talebinizin çizimini yapınız.
            </div>
            <div className="sketch-content">
              <Sketch onChange={(base64) => setFieldValue("sketch", base64)} />
              <ErrorMessage name="sketch" component="div" className="error" />
            </div>
            <button type="submit" className="save-btn">Kaydet</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Home;
