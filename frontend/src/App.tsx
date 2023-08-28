import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Booking from "./components/booking";
import Login from "./components/login";
import MyBookings from "./components/mybookings";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/booking",
      element: <Booking />,
    },
    {
      path: "/mybookings",
      element: <MyBookings />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

