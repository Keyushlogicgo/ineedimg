import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import useHelper from "../../hook/useHelper";

const RotateImg = () => {
  const {
    singleDownload,
    base64ToBlob,
    handlePhoto,
    handleRemove,
    zipDownload,
    photo,
  } = useHelper();
  const [image, setImage] = useState({
    file: "",
    url: "",
  });
  const [outputImg, setOutputImg] = useState("");
  const [rottedCtn, setRottedCtn] = useState(0);
  const [isRotated, setIsRotated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = (input) => {
    if (input.files && input.files[0]) {
      var render = new FileReader();
      render.onload = function (e) {
        setImage({ file: input.files[0], url: e.target.result });
        setRottedCtn(0);
      };
      render.readAsDataURL(input.files[0]);
    }
  };

  const handleRotateImg = async () => {
    setRottedCtn(rottedCtn < 3 ? rottedCtn + 1 : 0);
  };
  var convertCtn = 0;
  const handleConvert = () => {
    setIsLoading(true);
    console.time();
    var degrees = rottedCtn * 90;
    var filesArr = Array.prototype.slice.call(photo);

    filesArr.forEach(async (item, key) => {
      const newData = await rotateImage(degrees, item.file);
      const newFile = await base64ToBlob(newData);
      item.file = newFile;
      convertCtn++;
      if (filesArr.length === convertCtn) {
        console.timeEnd();
        setIsRotated(true);
        setIsLoading(false);
      }
    });
  };

  function rotateImage(degree, file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        var cContext = canvas.getContext("2d");
        var cw = img.width,
          ch = img.height,
          cx = 0,
          cy = 0;

        // Calculate new canvas size and x/y coorditates for image
        switch (degree) {
          case 90:
            cw = img.height;
            ch = img.width;
            cy = img.height * -1;
            break;
          case 180:
            cx = img.width * -1;
            cy = img.height * -1;
            break;
          case 270:
            cw = img.height;
            ch = img.width;
            cx = img.width * -1;
            break;
        }

        // Rotate image
        canvas.setAttribute("width", cw);
        canvas.setAttribute("height", ch);
        cContext.rotate((degree * Math.PI) / 180);
        cContext.drawImage(img, cx, cy);
        const dataUrl = canvas.toDataURL("image/jpeg");

        resolve(dataUrl);
      };
      img.onerror = function () {
        reject(new Error("Failed to load image"));
      };
      img.src = URL.createObjectURL(file);
    });
  }

  return (
    <>
      <input
        type="file"
        id="cropFile"
        multiple
        onChange={(e) => {
          handlePhoto(e.target);
        }}
        hidden
      />
      <div>
        <label htmlFor="cropFile" className="btn btn-info me-2">
          UPLOAD IMG
        </label>
        <button
          className="btn btn-secondary me-2"
          onClick={() => {
            handleRotateImg(image.file);
          }}
        >
          Rotate
        </button>
      </div>
      {JSON.stringify(image) !== "{}" ? (
        <>
          <Card>
            <Card.Body>
              <Row>
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
                            style={{
                              transform: `rotate(${rottedCtn * 90}deg)`,
                            }}
                            src={item.url}
                          />
                          <p className="text-center fs-14 mb-0 p-1">
                            {item.name}
                          </p>

                          <button
                            onClick={(e) => {
                              singleDownload(item.file);
                            }}
                            type="button"
                            className="btn btn-secondary w-100"
                          >
                            Download
                          </button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
            <Card.Footer>
              {isLoading ? (
                <span className="btn w-100 btn-secondary">Loading...</span>
              ) : !isRotated ? (
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={handleConvert}
                >
                  Convert
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={() => zipDownload(photo, "myfile", "")}
                >
                  Download All
                </button>
              )}
            </Card.Footer>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default RotateImg;
