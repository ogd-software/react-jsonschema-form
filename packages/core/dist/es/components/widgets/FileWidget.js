import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { dataURItoBlob, shouldRender } from "../../utils";

function addNameToDataURL(dataURL, name) {
  return dataURL.replace(";base64", ";name=".concat(encodeURIComponent(name), ";base64"));
}

function processFile(file) {
  var name = file.name,
      size = file.size,
      type = file.type;
  return new _Promise(function (resolve, reject) {
    var reader = new window.FileReader();
    reader.onerror = reject;

    reader.onload = function (event) {
      resolve({
        dataURL: addNameToDataURL(event.target.result, name),
        name: name,
        size: size,
        type: type
      });
    };

    reader.readAsDataURL(file);
  });
}

function processFiles(files) {
  return _Promise.all(_mapInstanceProperty([]).call(files, processFile));
}

function FilesInfo(props) {
  var filesInfo = props.filesInfo;

  if (filesInfo.length === 0) {
    return null;
  }

  return React.createElement("ul", {
    className: "file-info"
  }, _mapInstanceProperty(filesInfo).call(filesInfo, function (fileInfo, key) {
    var name = fileInfo.name,
        size = fileInfo.size,
        type = fileInfo.type;
    return React.createElement("li", {
      key: key
    }, React.createElement("strong", null, name), " (", type, ", ", size, " bytes)");
  }));
}

function extractFileInfo(dataURLs) {
  var _context;

  return _mapInstanceProperty(_context = _filterInstanceProperty(dataURLs).call(dataURLs, function (dataURL) {
    return typeof dataURL !== "undefined";
  })).call(_context, function (dataURL) {
    var _dataURItoBlob = dataURItoBlob(dataURL),
        blob = _dataURItoBlob.blob,
        name = _dataURItoBlob.name;

    return {
      name: name,
      size: blob.size,
      type: blob.type
    };
  });
}

var FileWidget =
/*#__PURE__*/
function (_Component) {
  _inherits(FileWidget, _Component);

  function FileWidget(props) {
    var _this;

    _classCallCheck(this, FileWidget);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FileWidget).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onChange = _this$props.onChange;
      processFiles(event.target.files).then(function (filesInfo) {
        var state = {
          values: _mapInstanceProperty(filesInfo).call(filesInfo, function (fileInfo) {
            return fileInfo.dataURL;
          }),
          filesInfo: filesInfo
        };

        _this.setState(state, function () {
          if (multiple) {
            onChange(_valuesInstanceProperty(state));
          } else {
            onChange(_valuesInstanceProperty(state)[0]);
          }
        });
      });
    });

    var value = props.value;
    var values = _Array$isArray(value) ? value : [value];
    _this.state = {
      values: values,
      filesInfo: extractFileInfo(values)
    };
    return _this;
  }

  _createClass(FileWidget, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return shouldRender(this, nextProps, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          multiple = _this$props2.multiple,
          id = _this$props2.id,
          readonly = _this$props2.readonly,
          disabled = _this$props2.disabled,
          autofocus = _this$props2.autofocus,
          options = _this$props2.options;
      var filesInfo = this.state.filesInfo;
      return React.createElement("div", null, React.createElement("p", null, React.createElement("input", {
        ref: function ref(_ref) {
          return _this2.inputRef = _ref;
        },
        id: id,
        type: "file",
        disabled: readonly || disabled,
        onChange: this.onChange,
        defaultValue: "",
        autoFocus: autofocus,
        multiple: multiple,
        accept: options.accept
      })), React.createElement(FilesInfo, {
        filesInfo: filesInfo
      }));
    }
  }]);

  return FileWidget;
}(Component);

FileWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  FileWidget.propTypes = {
    multiple: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    autofocus: PropTypes.bool
  };
}

export default FileWidget;