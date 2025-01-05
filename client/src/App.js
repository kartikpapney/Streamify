import Search from "./components/Search";
import Container from "./components/Container";
import Finish from "./components/Finish";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const App = () => {
  
  return (
    <div className="p-5">
      <Search />
      <Outlet />
      <Finish/>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Container />,
      }
    ],
  },
]);


export default () => <RouterProvider router={appRouter} />;
