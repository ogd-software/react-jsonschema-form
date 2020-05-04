import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/esm/objectWithoutProperties";
import React from "react";
export default function IconButton(props) {
  var _context;

  var _props$type = props.type,
      type = _props$type === void 0 ? "default" : _props$type,
      icon = props.icon,
      className = props.className,
      otherProps = _objectWithoutProperties(props, ["type", "icon", "className"]);

  return React.createElement("button", _extends({
    type: "button",
    className: _concatInstanceProperty(_context = "btn btn-".concat(type, " ")).call(_context, className)
  }, otherProps), React.createElement("i", {
    className: "glyphicon glyphicon-".concat(icon)
  }));
}