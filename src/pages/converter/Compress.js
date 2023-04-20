import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Compressor from "compressorjs";
import useHelper from "../../hook/useHelper";

const Compress = () => {
  const { zipDownload, singleDownload, handlePhoto, handleRemove, photo } =
    useHelper();

  const [isCompress, setIsCompress] = useState(false);

  const handleCompress = () => {
    var filesArr = Array.prototype.slice.call(photo);
    filesArr.forEach((item, key) => {
      new Compressor(item.file, {
        quality: 0.6,
        success: (res) => {
          photo[key].file = res;
        },
      });
    });
    setIsCompress(true);
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
                      {isCompress ? (
                        <button
                          onClick={(e) => {
                            singleDownload(item.file);
                          }}
                          type="button"
                          className="btn btn-secondary w-100"
                        >
                          Download
                        </button>
                      ) : null}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Card.Body>
        <Card.Footer>
          {isCompress ? (
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => zipDownload(photo, "myfile")}
            >
              Download All
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={handleCompress}
            >
              Compress
            </button>
          )}
        </Card.Footer>
      </Card>
    </>
  );
};

export default Compress;
