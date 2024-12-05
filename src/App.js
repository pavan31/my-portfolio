import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import ContactUsPage from "./pages/ContactUsPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true, // The index route for '/'
          element: <Navigate to="/Home" />, // Redirect to '/Home'
        },
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
