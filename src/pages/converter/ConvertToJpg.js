import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import useHelper from "../../hook/useHelper";

const ConvertToJpg = () => {
  const {
    zipDownload,
    singleDownload,
    handlePhoto,
    handleRemove,
    setIsLoading,
    base64ToBlob,
    isLoading,
    photo,
    isUploading,
    uploadedFileLength,
  } = useHelper();

  const [isConvert, setIsConvert] = useState(false);

  var convertCtn = 0;
  const handleConvertToJpg = () => {
    setIsLoading(true);
    var filesArr = Array.prototype.slice.call(photo);
    filesArr.forEach(async (item, key) => {
      const imgData = await convertImageToJPEG(item.file);
      const newImg = await base64ToBlob(imgData);
      photo[key].file = newImg;
      convertCtn++;
      if (filesArr.length === convertCtn) {
        setIsLoading(false);
        setIsConvert(true);
      }
    });
  };

  const convertImageToJPEG = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg");
        resolve(dataUrl);
      };
      img.onerror = function () {
        reject(new Error("Failed to load image"));
      };
      img.src = URL.createObjectURL(file);
    });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            {!isConvert && !isLoading ? (
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
            ) : null}
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
                        <Card className={`h-100 pb-5`}>
                          <Card.Body className="p-0">
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
                      className="mb-3 previewBox"
                    >
                      <Card
                        className={`h-100 ${
                          isConvert ? "pb-5" : null
                        }  position-relative`}
                      >
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
                          {isConvert ? (
                            <button
                              onClick={(e) => {
                                singleDownload(item.file);
                              }}
                              type="button"
                              className="btn btn-secondary w-100 position-absolute bottom-0"
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
          ) : isConvert ? (
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => zipDownload(photo, "myfile", "jpg")}
            >
              Download All
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={handleConvertToJpg}
            >
              Convert To JPG
            </button>
          )}
        </Card.Footer>
      </Card>
    </>
  );
};

export default ConvertToJpg;
