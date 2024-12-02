import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <></>,
        },
        {
          path: "/Discover",
          element: <></>,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
