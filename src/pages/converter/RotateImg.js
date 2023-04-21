import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import useHelper from "../../hook/useHelper";

const RotateImg = () => {
  const { singleDownload, base64ToBlob } = useHelper();
  const [image, setImage] = useState({
    file: "",
    url: "",
  });
  const [outputImg, setOutputImg] = useState("");
  const [rottedCtn, setRottedCtn] = useState(1);

  const handleFile = (input) => {
    if (input.files && input.files[0]) {
      var render = new FileReader();
      render.onload = function (e) {
        setImage({ file: input.files[0], url: e.target.result });
      };
      render.readAsDataURL(input.files[0]);
    }
  };

  const handleRotateImg = async () => {
    const imgData = await rotatedImage(image.file);
    const newFile = await base64ToBlob(imgData);

    image.file = newFile;
    setOutputImg(imgData);
  };
  let RottedCtn = 1;
  const rotatedImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext("2d");

        setRottedCtn(rottedCtn < 4 ? rottedCtn + 1 : 1);
        var x = 0;
        var y = 0;
        var w = this.width;
        var h = this.height;

        console.log("go", rottedCtn);

        var degrees = rottedCtn * 90;
        ctx.save();
        ctx.translate(x + w / 2, y + h / 2);
        ctx.rotate((degrees * Math.PI) / 180.0);
        ctx.translate(-x - w / 2, -y - h / 2);
        ctx.drawImage(this, x, y, w, h);
        ctx.restore();
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
      <input
        type="file"
        id="cropFile"
        onChange={(e) => {
          handleFile(e.target);
        }}
        hidden
      />
      <div>
        <label htmlFor="cropFile" className="btn btn-info">
          UPLOAD IMG
        </label>
        <button className="btn btn-secondary mx-2" onClick={handleRotateImg}>
          Rotate
        </button>
        <button
          onClick={(e) => {
            singleDownload(image.file);
          }}
          type="button"
          className="btn btn-secondary"
        >
          Download
        </button>
      </div>
      {JSON.stringify(image) !== "{}" ? (
        <>
          <Card>
            <Card.Body>
              <Row>
                <Col md={6}>
                  {image.url !== "" ? (
                    <img
                      src={image.url}
                      className="w-100 h-500 border object-contain"
                    />
                  ) : null}
                </Col>
                <Col md={6}>
                  {outputImg !== "" ? (
                    <img
                      src={outputImg}
                      className="w-100 h-500 border object-contain"
                    />
                  ) : null}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default RotateImg;
