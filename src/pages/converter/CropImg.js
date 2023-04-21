import React, { useRef, useState } from "react";
// import Cropper from "react-easy-crop";
import { Card, Col, Row } from "react-bootstrap";
import useHelper from "../../hook/useHelper";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

const CropImg = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [size, setSize] = useState({});
  const [image, setImage] = useState({});
  const [dummyImg, setDummyImg] = useState("");

  const { singleDownload, base64ToBlob } = useHelper();

  //   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
  //     setSize(croppedAreaPixels);
  //   }, []);

  const handleCropImg = async () => {
    const imgData = await convertImageToJPEG(image.file);
    setDummyImg(imgData);
    image.file = await base64ToBlob(imgData);
  };

  console.log(image);
  const convertImageToJPEG = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = size.width;
        canvas.height = size.height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "blue";
        ctx.drawImage(this, -size.x || 0, -size.y || 0);
        const dataUrl = canvas.toDataURL("image/jpeg");
        resolve(dataUrl);
      };
      img.onerror = function () {
        reject(new Error("Failed to load image"));
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFile = (input) => {
    if (input.files && input.files[0]) {
      var render = new FileReader();
      render.onload = function (e) {
        setImage({ file: input.files[0], url: e.target.result });
      };
      render.readAsDataURL(input.files[0]);
    }
  };

  //   const cropperRef = "";
  const onCrop = (e) => {
    console.log("e", e.detail);
    setSize(e.detail);
    // const cropper = cropperRef.current?.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <>
      <input
        type="file"
        id="cropFile"
        onChange={(e) => {
          handleFile(e.target);
        }}
        hidden
      />
      <label htmlFor="cropFile">UPLOAD IMG</label>
      <div>
        <button className="btn btn-secondary" onClick={handleCropImg}>
          CROP
        </button>
        <button
          onClick={(e) => {
            singleDownload(image.file);
          }}
          type="button"
          className="btn btn-secondary ms-2"
        >
          Download
        </button>
      </div>
      {JSON.stringify(image) !== "{}" ? (
        <>
          <Card>
            <Card.Body className="cropBox">
              <Row>
                <Col md={12}>
                  <Cropper
                    src={image.url}
                    style={{ height: 500, width: "100%" }}
                    initialAspectRatio={16 / 9}
                    guides={true}
                    crop={onCrop}
                  />
                </Col>
                <Col md={6}>
                  <img src={dummyImg} className="w-100 h-100" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default CropImg;
