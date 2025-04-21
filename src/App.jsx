import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/reset.css";
import AllRoutes from "./routes/allRoutes.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <AllRoutes/>
      </Router>
    </div>
  );
};

export default App;
