import React, { useState } from "react";
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
        handleRotateImg(input.files[0]);
      };
      render.readAsDataURL(input.files[0]);
    }
  };

  const handleRotateImg = async (file) => {
    // const imgData = await rotatedImage(image.file);
    // const newFile = await base64ToBlob(imgData);
    // image.file = newFile;
    // setOutputImg(imgData);
    setRottedCtn(rottedCtn < 4 ? rottedCtn + 1 : 1);
    var degrees = (rottedCtn - 1) * 90;
    console.log("file", file);
    const newData = await rotateImage(degrees, file || image.file);
    setOutputImg(newData);
  };

  // const rotatedImage = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.onload = function () {
  //       const canvas = document.createElement("canvas");
  //       canvas.width = this.width;
  //       canvas.height = this.height;
  //       const ctx = canvas.getContext("2d");

  //       setRottedCtn(rottedCtn < 4 ? rottedCtn + 1 : 1);
  //       var x = 0;
  //       var y = 0;
  //       var w = this.width;
  //       var h = this.height;

  //       console.log("go", rottedCtn);

  //       var degrees = (rottedCtn - 1) * 90;
  //       ctx.save();
  //       ctx.translate(x + w / 2, y + h / 2);
  //       ctx.rotate(0.017453292519943295 * degrees);
  //       ctx.translate(-x - w / 2, -y - h / 2);
  //       ctx.drawImage(this, x, y, w, h);
  //       ctx.restore();
  //       const dataUrl = canvas.toDataURL("image/jpeg");
  //       resolve(dataUrl);
  //     };
  //     img.onerror = function () {
  //       reject(new Error("Failed to load image"));
  //     };
  //     img.src = URL.createObjectURL(file);
  //   });
  // };

  function rotateImage(degree, file) {
    console.log(degree, file);
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
        console.log("degree", degree);
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
        onChange={(e) => {
          handleFile(e.target);
        }}
        hidden
      />
      <div>
        <label htmlFor="cropFile" className="btn btn-info">
          UPLOAD IMG
        </label>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => {
            handleRotateImg(image.file);
          }}
        >
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
          <Card className="py-5">
            <Card.Body>
              <Row>
                {/* <Col md={6}>
                  {image.url !== "" ? (
                    <img
                      src={image.url}
                      className=" border object-contain h-500"
                      alt="..."
                      id="previewImage"
                      style={{
                        transform: `rotate(${rottedCtn * 90}deg)`,
                      }}
                    />
                  ) : null}
                </Col> */}
                <Col md={6}>
                  {outputImg !== "" ? (
                    <img
                      src={outputImg}
                      className="w-100 h-500 border object-contain"
                      alt="..."
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
