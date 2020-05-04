import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import React from "react";
import PropTypes from "prop-types";
import { pad } from "../../utils";
export function utcToLocal(jsonDate) {
  var _context, _context2, _context3, _context4, _context5, _context6;

  if (!jsonDate) {
    return "";
  } // required format of `"yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS"
  // https://html.spec.whatwg.org/multipage/input.html#local-date-and-time-state-(type%3Ddatetime-local)
  // > should be a _valid local date and time string_ (not GMT)
  // Note - date constructor passed local ISO-8601 does not correctly
  // change time to UTC in node pre-8


  var date = new Date(jsonDate);
  var yyyy = pad(date.getFullYear(), 4);
  var MM = pad(date.getMonth() + 1, 2);
  var dd = pad(date.getDate(), 2);
  var hh = pad(date.getHours(), 2);
  var mm = pad(date.getMinutes(), 2);
  var ss = pad(date.getSeconds(), 2);
  var SSS = pad(date.getMilliseconds(), 3);
  return _concatInstanceProperty(_context = _concatInstanceProperty(_context2 = _concatInstanceProperty(_context3 = _concatInstanceProperty(_context4 = _concatInstanceProperty(_context5 = _concatInstanceProperty(_context6 = "".concat(yyyy, "-")).call(_context6, MM, "-")).call(_context5, dd, "T")).call(_context4, hh, ":")).call(_context3, mm, ":")).call(_context2, ss, ".")).call(_context, SSS);
}
export function localToUTC(dateString) {
  if (dateString) {
    return new Date(dateString).toJSON();
  }
}

function DateTimeWidget(props) {
  var value = props.value,
      _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return React.createElement(BaseInput, _extends({
    type: "datetime-local"
  }, props, {
    value: utcToLocal(value),
    onChange: function onChange(value) {
      return _onChange(localToUTC(value));
    }
  }));
}

if (process.env.NODE_ENV !== "production") {
  DateTimeWidget.propTypes = {
    value: PropTypes.string
  };
}

export default DateTimeWidget;