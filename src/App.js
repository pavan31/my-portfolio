import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import ContactUsPage from "./pages/ContactUsPage";
import HomePage from "./pages/HomePage";
function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "/Home",
          element: <HomePage />,
        },
        {
          path: "/Contact",
          element: <ContactUsPage />,
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
