// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as ReactDom from "react-dom";

function App$App(Props) {
  return React.createElement(React.Suspense, {
              children: React.createElement("div", undefined, React.createElement("h1", undefined, "Hello, Joshua!")),
              fallback: React.createElement(React.Fragment, undefined)
            });
}

var App = {
  make: App$App
};

var root = document.querySelector("#root");

if (!(root == null)) {
  ReactDom.render(React.createElement(App$App, {}), root);
}

export {
  App ,
  
}
/* root Not a pure module */
