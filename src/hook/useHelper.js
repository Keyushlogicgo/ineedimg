import { useState } from "react";
import saveAs from "save-as";
import JSZip from "jszip";

const useHelper = () => {
  const [photo, setPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileLength, setUploadedFileLength] = useState(0);

  const handleRemove = async (index) => {
    var data = photo.filter((item) => item.id !== index);
    setPhoto(() => data);
  };

  const handlePhoto = (input) => {
    var setImageCtn = 0;
    setIsUploading(true);
    setUploadedFileLength(input.files.length);
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
          setImageCtn++;
          if (setImageCtn === input.files.length) {
            setIsUploading(false);
            setUploadedFileLength(0);
          }
        };
        reader.readAsDataURL(item);
      });
    }
  };

  const zipDownload = (data, filename, ext) => {
    const zip = new JSZip();
    const img = zip.folder("images");
    for (let i = 0; i < data.length; i++) {
      var fileName = data[i].name;
      if (ext !== "") {
        fileName =
          data[i].name.substr(0, data[i].name.lastIndexOf(".")) + ".jpg";
      }

      img.file(fileName, data[i].file, { base64: true });
    }
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, filename + ".zip" || "iNeedImg.zip");
    });
  };

  const base64ToBlob = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return data;
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
    setIsLoading,
    base64ToBlob,
    isLoading,
    photo,
    isUploading,
    uploadedFileLength,
  };
};

export default useHelper;
