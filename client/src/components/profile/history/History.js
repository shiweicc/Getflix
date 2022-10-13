import React from "react";
import Carousel from "./subComponents/history_carousel.jsx";
import fakeData from "../../../fakeData/fakeHistory.js";

function History() {

  return (
    <div className="history">
      <h3>History</h3>
      <Carousel />
    </div>
  );
}

export default History;