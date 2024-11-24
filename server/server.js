import React from "react";
const express = require("express");
const ReactDOMServer = require("react-dom/server");
const App = require("../src/App");
const app = express();
const path = require("path");
const fs = require("fs");

app.get("/", (req, res) => {
  fs.readFile(path.resolve(__dirname, "../build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log("err", err);
      return res.status(500).send(err);
    }
    const renderString = ReactDOMServer.renderToString(React.createElement(App.default));

    const content = data.replace('<div id="root"></div>', `<div id="root">${renderString}</div>`);
    return res.status(200).send(content);
  });
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(5000, () => {
  console.log("success, http://localhost:5000/");
});
