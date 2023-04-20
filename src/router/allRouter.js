import NoPage from "../component/error/NoPage";
import Home from "../pages/home/Index";

// Converter
import Compress from "../pages/converter/Compress";
import ConvertToJpg from "../pages/converter/ConvertToJpg";

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
    path: "*",
    element: <NoPage />,
  },
];
