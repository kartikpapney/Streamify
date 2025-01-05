import Search from "./components/Search";
import MovieContainer from "./components/MovieContainer";
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
        element: <MovieContainer />,
      }
    ],
  },
]);


export default () => <RouterProvider router={appRouter} />;
