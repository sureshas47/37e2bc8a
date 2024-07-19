import React from "react";

import Header from "./Component/Header.jsx";
import Footer from "./Component/Footer.jsx";
import FullWidthTabs from "./Component/FullWidthTabs.jsx";

const App = () => {
  return (
    <>
      <div className="container">
        <Header />
        <div style={{ flex: 1 }}>
          {" "}
          <FullWidthTabs />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
