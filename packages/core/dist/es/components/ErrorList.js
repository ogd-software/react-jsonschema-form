import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import React from "react";
export default function ErrorList(props) {
  var errors = props.errors;
  return React.createElement("div", {
    className: "panel panel-danger errors"
  }, React.createElement("div", {
    className: "panel-heading"
  }, React.createElement("h3", {
    className: "panel-title"
  }, "Errors")), React.createElement("ul", {
    className: "list-group"
  }, _mapInstanceProperty(errors).call(errors, function (error, i) {
    return React.createElement("li", {
      key: i,
      className: "list-group-item text-danger"
    }, error.stack);
  })));
}