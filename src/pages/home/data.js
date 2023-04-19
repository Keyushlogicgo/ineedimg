import { ReactComponent as CompressSvg } from "../../assets/images/svg/compress.svg";
import { ReactComponent as ResizeSvg } from "../../assets/images/svg/resize.svg";
import { ReactComponent as CropSvg } from "../../assets/images/svg/crop.svg";
import { ReactComponent as ConvertToJpgSvg } from "../../assets/images/svg/converttojpg.svg";
import { ReactComponent as ConvertFromJpgSvg } from "../../assets/images/svg/convertfromjpg.svg";
import { ReactComponent as PhotoEditorSvg } from "../../assets/images/svg/photoeditor.svg";
import { ReactComponent as WatermarkImageSvg } from "../../assets/images/svg/watermarkimage.svg";
import { ReactComponent as MemeGeneratorSvg } from "../../assets/images/svg/memegenerator.svg";
import { ReactComponent as RotateImageSvg } from "../../assets/images/svg/rotateimage.svg";
import { ReactComponent as HtmlToImageSvg } from "../../assets/images/svg/htmltoimage.svg";
import { ReactComponent as UpscaleImageSvg } from "../../assets/images/svg/upscaleimage.svg";
import { ReactComponent as BlurFaceSvg } from "../../assets/images/svg/blurface.svg";

const classList = "hw-42";

export const functionList = [
  {
    url: "/compress",
    icon: <CompressSvg className={classList} />,
    title: "Compress IMAGE",
    description:
      "Compress JPG, PNG, SVG, and GIFs while saving space and maintaining quality.",
  },
  {
    url: "/",
    icon: <ResizeSvg className={classList} />,
    title: "Resize IMAGE",
    description:
      "Define your dimensions, by percent or pixel, and resize your JPG, PNG, SVG, and GIF images.",
  },
  {
    url: "/",
    icon: <CropSvg className={classList} />,
    title: "Crop IMAGE",
    description:
      "Crop JPG, PNG, or GIFs with ease; Choose pixels to define your rectangle or use our visual editor.",
  },
  {
    url: "/",
    icon: <ConvertToJpgSvg className={classList} />,
    title: "convert to JPG",
    description:
      "Turn PNG, GIF, TIF, PSD, SVG, WEBP, HEIC, or RAW format images to JPG in bulk with ease.",
  },
  {
    url: "/",
    icon: <ConvertFromJpgSvg className={classList} />,
    title: "Convert from JPG",
    description:
      "Turn JPG images to PNG and GIF. Choose several JPGs to create an animated GIF in seconds!",
  },
  {
    url: "/",
    icon: <PhotoEditorSvg className={classList} />,
    title: "Photo editor",
    description:
      "Spice up your pictures with text, effects, frames or stickers. Simple editing tools for your image needs.",
  },
  {
    url: "/",
    icon: <WatermarkImageSvg className={classList} />,
    title: "Watermark IMAGE",
    description:
      "Stamp an image or text over your images in seconds. Choose the typography, transparency and position.",
  },
  {
    url: "/",
    icon: <MemeGeneratorSvg className={classList} />,
    title: "Meme generator",
    description:
      "Create your memes online with ease. Caption meme images or upload your pictures to make custom memes.",
  },
  {
    url: "/",
    icon: <RotateImageSvg className={classList} />,
    title: "Rotate IMAGE",
    description:
      "Rotate many images JPG, PNG or GIF at same time. Choose to rotate only landscape or portrait images!",
  },
  {
    url: "/",
    icon: <HtmlToImageSvg className={classList} />,
    title: "HTML to IMAGE",
    description:
      "Convert webpages in HTML to JPG or SVG. Copy and paste the URL of the page you want and convert it to IMAGE with a click.",
  },
  {
    url: "/",
    icon: <UpscaleImageSvg className={classList} />,
    title: "Upscale Image",
    description:
      "Enlarge your images with high resolution. Easily increase the size of your JPG and PNG images while maintaining visual quality.",
  },
  {
    url: "/",
    icon: <BlurFaceSvg className={classList} />,
    title: "Blur face",
    description:
      "Easily blur out faces in photos. You can also blur licence plates and other objects to hide private information.",
  },
];
