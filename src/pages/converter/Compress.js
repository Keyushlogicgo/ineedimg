import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Compressor from "compressorjs";
import useHelper from "../../hook/useHelper";

const Compress = () => {
  const {
    zipDownload,
    singleDownload,
    handlePhoto,
    handleRemove,
    setIsLoading,
    isLoading,
    photo,
    isUploading,
    uploadedFileLength,
  } = useHelper();

  const [isCompress, setIsCompress] = useState(false);

  const handleCompress = () => {
    setIsLoading(true);

    var convertCtn = 0;
    var filesArr = Array.prototype.slice.call(photo);
    filesArr.forEach((item, key) => {
      new Compressor(item.file, {
        quality: 0.5,
        success: (res) => {
          photo[key].file = res;
        },
      });
      convertCtn++;
      if (filesArr.length === convertCtn) {
        setIsCompress(true);
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col xl={2} lg={3} md={4} sm={6} xs={12} className="mb-3">
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
            {isUploading
              ? Array(uploadedFileLength)
                  .fill(1)
                  .map((item, key) => {
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
                        <Card className={`h-100 py-5`}>
                          <Card.Body className="p-0 d-flex align-items-center justify-content-center">
                            i am placeholder
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })
              : photo?.map((item, key) => {
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
                          {!isLoading ? (
                            <button
                              onClick={(e) => {
                                handleRemove(item.id);
                              }}
                              type="button"
                              className="btn btn-danger hw-42 position-absolute end-0 top-0"
                            >
                              -
                            </button>
                          ) : null}
                          <img
                            className="h-200 w-100 object-contain"
                            alt="..."
                            src={item.url}
                          />
                          <p className="text-center fs-14 mb-0 p-1">
                            {item.name}
                          </p>
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
          {isLoading || isUploading ? (
            <span className="btn w-100 btn-secondary">Loading...</span>
          ) : isCompress ? (
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => zipDownload(photo, "myfile", "")}
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
