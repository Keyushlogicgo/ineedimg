import { useState } from "react";
import saveAs from "save-as";
import JSZip from "jszip";

const useHelper = () => {
  const [photo, setPhoto] = useState([]);

  const handleRemove = async (index) => {
    var data = photo.filter((item) => item.id !== index);
    setPhoto(() => data);
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

  const zipDownload = (data, filename) => {
    const zip = new JSZip();
    const img = zip.folder("images");
    for (let i = 0; i < data.length; i++) {
      img.file(data[i].name, data[i].file, { base64: true });
    }
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, filename + ".zip" || "iNeedImg.zip");
    });
  };

  const singleDownload = async (file) => {
    const blob = file;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compress" + file.name;
    a.click();
  };
  return {
    zipDownload,
    handleRemove,
    singleDownload,
    handlePhoto,
    photo,
  };
};

export default useHelper;
