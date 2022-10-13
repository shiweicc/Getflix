import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/main/main.js";
import Profile from "./components/profile/Profile.js";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";



function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>{!data ? "Loading..." : data}</p>
          </header>
        </div>,
    },
    {
      path: "/main",
      element: <Main />
    },
    {
      path: "/profile",
      element: <Profile />
    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;