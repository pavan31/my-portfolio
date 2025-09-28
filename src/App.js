import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import ModernHomePage from "./pages/ModernHomePage";
import ErrorPage from "./pages/ErrorPage";
import { cssVariables } from "./theme/modernTheme";

function App() {
  // Inject CSS variables
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = cssVariables;
    document.head.appendChild(style);

    // Set default theme
    document.documentElement.setAttribute('data-theme', 'dark');

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <ModernHomePage />,
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
