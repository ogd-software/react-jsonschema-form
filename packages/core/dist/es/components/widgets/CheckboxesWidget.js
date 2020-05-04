import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _sortInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/sort";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import React from "react";
import PropTypes from "prop-types";

function selectValue(value, selected, all) {
  var _context;

  var at = _indexOfInstanceProperty(all).call(all, value);

  var updated = _concatInstanceProperty(_context = _sliceInstanceProperty(selected).call(selected, 0, at)).call(_context, value, _sliceInstanceProperty(selected).call(selected, at)); // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order


  return _sortInstanceProperty(updated).call(updated, function (a, b) {
    return _indexOfInstanceProperty(all).call(all, a) > _indexOfInstanceProperty(all).call(all, b);
  });
}

function deselectValue(value, selected) {
  return _filterInstanceProperty(selected).call(selected, function (v) {
    return v !== value;
  });
}

function CheckboxesWidget(props) {
  var id = props.id,
      disabled = props.disabled,
      options = props.options,
      value = props.value,
      autofocus = props.autofocus,
      readonly = props.readonly,
      _onChange = props.onChange;
  var enumOptions = options.enumOptions,
      enumDisabled = options.enumDisabled,
      inline = options.inline;
  return React.createElement("div", {
    className: "checkboxes",
    id: id
  }, _mapInstanceProperty(enumOptions).call(enumOptions, function (option, index) {
    var _context2;

    var checked = _indexOfInstanceProperty(value).call(value, option.value) !== -1;
    var itemDisabled = enumDisabled && _indexOfInstanceProperty(enumDisabled).call(enumDisabled, option.value) != -1;
    var disabledCls = disabled || itemDisabled || readonly ? "disabled" : "";
    var checkbox = React.createElement("span", null, React.createElement("input", {
      type: "checkbox",
      id: _concatInstanceProperty(_context2 = "".concat(id, "_")).call(_context2, index),
      checked: checked,
      disabled: disabled || itemDisabled || readonly,
      autoFocus: autofocus && index === 0,
      onChange: function onChange(event) {
        var all = _mapInstanceProperty(enumOptions).call(enumOptions, function (_ref) {
          var value = _ref.value;
          return value;
        });

        if (event.target.checked) {
          _onChange(selectValue(option.value, value, all));
        } else {
          _onChange(deselectValue(option.value, value));
        }
      }
    }), React.createElement("span", null, option.label));
    return inline ? React.createElement("label", {
      key: index,
      className: "checkbox-inline ".concat(disabledCls)
    }, checkbox) : React.createElement("div", {
      key: index,
      className: "checkbox ".concat(disabledCls)
    }, React.createElement("label", null, checkbox));
  }));
}

CheckboxesWidget.defaultProps = {
  autofocus: false,
  options: {
    inline: false
  }
};

if (process.env.NODE_ENV !== "production") {
  CheckboxesWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func
  };
}

export default CheckboxesWidget;