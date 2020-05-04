import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _everyInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/every";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _Set from "@babel/runtime-corejs3/core-js-stable/set";
import React from "react";
import PropTypes from "prop-types";
import { asNumber, guessType } from "../../utils";
var nums = new _Set(["number", "integer"]);
/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */

function processValue(schema, value) {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  var type = schema.type,
      items = schema.items;

  if (value === "") {
    return undefined;
  } else if (type === "array" && items && nums.has(items.type)) {
    return _mapInstanceProperty(value).call(value, asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return asNumber(value);
  } // If type is undefined, but an enum is present, try and infer the type from
  // the enum values


  if (schema["enum"]) {
    var _context, _context2;

    if (_everyInstanceProperty(_context = schema["enum"]).call(_context, function (x) {
      return guessType(x) === "number";
    })) {
      return asNumber(value);
    } else if (_everyInstanceProperty(_context2 = schema["enum"]).call(_context2, function (x) {
      return guessType(x) === "boolean";
    })) {
      return value === "true";
    }
  }

  return value;
}

function getValue(event, multiple) {
  if (multiple) {
    var _context3, _context4;

    return _mapInstanceProperty(_context3 = _filterInstanceProperty(_context4 = _sliceInstanceProperty([]).call(event.target.options)).call(_context4, function (o) {
      return o.selected;
    })).call(_context3, function (o) {
      return o.value;
    });
  } else {
    return event.target.value;
  }
}

function SelectWidget(props) {
  var schema = props.schema,
      id = props.id,
      options = props.options,
      value = props.value,
      required = props.required,
      disabled = props.disabled,
      readonly = props.readonly,
      multiple = props.multiple,
      autofocus = props.autofocus,
      _onChange = props.onChange,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      placeholder = props.placeholder;
  var enumOptions = options.enumOptions,
      enumDisabled = options.enumDisabled;
  var emptyValue = multiple ? [] : "";
  return React.createElement("select", {
    id: id,
    multiple: multiple,
    className: "form-control",
    value: typeof value === "undefined" ? emptyValue : value,
    required: required,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    onBlur: onBlur && function (event) {
      var newValue = getValue(event, multiple);
      onBlur(id, processValue(schema, newValue));
    },
    onFocus: onFocus && function (event) {
      var newValue = getValue(event, multiple);
      onFocus(id, processValue(schema, newValue));
    },
    onChange: function onChange(event) {
      var newValue = getValue(event, multiple);

      _onChange(processValue(schema, newValue));
    }
  }, !multiple && schema["default"] === undefined && React.createElement("option", {
    value: ""
  }, placeholder), _mapInstanceProperty(enumOptions).call(enumOptions, function (_ref, i) {
    var value = _ref.value,
        label = _ref.label;
    var disabled = enumDisabled && _indexOfInstanceProperty(enumDisabled).call(enumDisabled, value) != -1;
    return React.createElement("option", {
      key: i,
      value: value,
      disabled: disabled
    }, label);
  }));
}

SelectWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  };
}

export default SelectWidget;