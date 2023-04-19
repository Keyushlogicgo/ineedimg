import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

const Compress = () => {
  const [photo, setPhoto] = useState([]);

  const handlePhoto = (input) => {
    if (input.files) {
      var filesArr = Array.prototype.slice.call(input.files);
      filesArr.forEach((item, key) => {
        var reader = new FileReader();
        reader.onload = async function (e) {
          setPhoto((preData) => [
            ...preData,
            { id: key, name: item.name, url: e.target.result },
          ]);
        };
        reader.readAsDataURL(item);
      });
    }
  };

  const handleRemove = async (index) => {
    var data = photo.filter((item) => item.id !== index);
    setPhoto(() => data);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col xl={2} lg={3} md={4} sm={6} xs={12}>
              <Card>
                <Card.Body className="h-200 p-0">
                  <label
                    htmlFor="inputHtml"
                    className="h-100 w-100 d-flex align-items-center justify-content-center cursor-pointer "
                  >
                    Click me
                  </label>
                  <input
                    name="imageFile"
                    type="file"
                    hidden
                    onChange={(e) => {
                      handlePhoto(e.target);
                    }}
                    accept="image/*"
                    multiple
                    id="inputHtml"
                  />
                </Card.Body>
              </Card>
            </Col>
            {photo?.map((item, key) => {
              return (
                <Col
                  xl={2}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  key={key}
                  className="mb-3"
                >
                  <Card>
                    <Card.Body className="p-0">
                      <button
                        onClick={(e) => {
                          handleRemove(item.id);
                        }}
                        type="button"
                        className="btn btn-danger hw-42 position-absolute end-0 top-0"
                      >
                        -
                      </button>
                      <img
                        className="h-200 w-100 object-contain"
                        alt="..."
                        src={item.url}
                      />
                      <p className="text-center fs-14 mb-0 p-1">{item.name}</p>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Compress;
