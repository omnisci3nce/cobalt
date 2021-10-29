// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Ancestor from "@rescriptbr/ancestor/src/Ancestor.bs.js";

function Header(Props) {
  return React.createElement(Ancestor.Default.Box.make, {
              borderBottom: [{
                  NAME: "xs",
                  VAL: [
                    {
                      NAME: "px",
                      VAL: 1
                    },
                    "solid",
                    {
                      NAME: "hex",
                      VAL: "#ddd"
                    }
                  ]
                }],
              display: [Ancestor.Default.xs("flex")],
              justifyContent: [Ancestor.Default.xs("space-between")],
              px: [Ancestor.Default.xs(3)],
              py: [Ancestor.Default.xs(1)],
              children: null
            }, "Cobalt", React.createElement(Ancestor.Default.Box.make, {
                  display: [Ancestor.Default.xs("flex")],
                  children: null
                }, React.createElement(Ancestor.Default.Box.make, {
                      px: [Ancestor.Default.xs(1)],
                      children: React.createElement("button", undefined, "About")
                    }), React.createElement("button", undefined, "Upload")));
}

var make = Header;

export {
  make ,
  
}
/* react Not a pure module */
