import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Compressor from "compressorjs";
import saveAs from "save-as";
import JSZip from "jszip";

const Compress = () => {
  const [photo, setPhoto] = useState([]);

  const [isCompress, setIsCompress] = useState(false);

  const handleCompress = () => {
    var filesArr = Array.prototype.slice.call(photo);
    filesArr.forEach((item, key) => {
      new Compressor(item.file, {
        quality: 0.5, // 0.6 can also be used, but its not recommended to go below.
        success: (res) => {
          photo[key].file = res;
        },
      });
    });
    setIsCompress(true);
  };

  const handlePhoto = (input) => {
    if (input.files) {
      var filesArr = Array.prototype.slice.call(input.files);
      filesArr.forEach((item, key) => {
        var reader = new FileReader();
        reader.onload = async function (e) {
          setPhoto((preData) => [
            ...preData,
            {
              id: key,
              name: item.name,
              url: e.target.result,
              file: item,
            },
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

  const handleDownload = async (file) => {
    console.log(file.name);
    const blob = file;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compress" + file.name;
    a.click();
  };

  const handleZipDownload = () => {
    const zip = new JSZip();
    const img = zip.folder("images");
    for (let i = 0; i < photo.length; i++) {
      img.file(photo[i].name, photo[i].file, { base64: true });
    }
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "ineedimg.zip");
    });
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
                            handleDownload(item.file);
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
              onClick={handleZipDownload}
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
