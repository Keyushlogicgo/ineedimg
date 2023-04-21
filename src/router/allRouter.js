import NoPage from "../component/error/NoPage";
import Home from "../pages/home/Index";

// Converter
import Compress from "../pages/converter/Compress";
import ConvertToJpg from "../pages/converter/ConvertToJpg";
import ConvertFromJpg from "../pages/converter/ConvertFromJpg";
import CropImg from "../pages/converter/CropImg";
import RotateImg from "../pages/converter/RotateImg";

export const publicRoute = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/compress",
    element: <Compress />,
  },
  {
    path: "/convert-to-jpg",
    element: <ConvertToJpg />,
  },
  {
    path: "/convert-from-jpg",
    element: <ConvertFromJpg />,
  },
  {
    path: "/crop-img",
    element: <CropImg />,
  },
  {
    path: "/rotate-img",
    element: <RotateImg />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
];
