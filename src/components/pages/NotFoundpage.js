import React, { Component } from "react";

import AppBarMain from "../ui-element/AppBarMain";
import NotFoundPageImage from "../../assets/images/not-found-page.svg";
// import Navigation from "../Navigation";

class NotFoundpage extends Component {
  render() {
    return (
      <div>
        <AppBarMain />
        <div style={{ textAlign: "center" }}>
          <h2>SORRY !!</h2>
          <h3 style={{ color: "red" }}>Page Not Found !</h3>
          <h4>
            Please Check your <strong>URL</strong> !
          </h4>
          <img
            className="animated infinite bounce"
            style={{ marginTop: 10, width: "300px" }}
            src={NotFoundPageImage}
            alt="Not found page logo"
          />
        </div>
      </div>
    );
  }
}

export default NotFoundpage;
