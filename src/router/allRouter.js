import NoPage from "../component/error/NoPage";
import Home from "../pages/home/Index";

// Converter
import Compress from "../pages/converter/Compress";

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
    path: "*",
    element: <NoPage />,
  },
];
