import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/esm/objectWithoutProperties";
import _objectSpread from "@babel/runtime-corejs3/helpers/esm/objectSpread";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _parseInt from "@babel/runtime-corejs3/core-js-stable/parse-int";
import _spliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/splice";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import AddButton from "../AddButton";
import IconButton from "../IconButton";
import React, { Component } from "react";
import includes from "core-js/features/array/includes";
import * as types from "../../types";
import { getWidget, getDefaultFormState, getUiOptions, isMultiSelect, isFilesArray, isFixedItems, allowAdditionalItems, optionsList, retrieveSchema, toIdSchema, getDefaultRegistry } from "../../utils";
import shortid from "shortid";

function ArrayFieldTitle(_ref) {
  var TitleField = _ref.TitleField,
      idSchema = _ref.idSchema,
      title = _ref.title,
      required = _ref.required;

  if (!title) {
    return null;
  }

  var id = "".concat(idSchema.$id, "__title");
  return React.createElement(TitleField, {
    id: id,
    title: title,
    required: required
  });
}

function ArrayFieldDescription(_ref2) {
  var DescriptionField = _ref2.DescriptionField,
      idSchema = _ref2.idSchema,
      description = _ref2.description;

  if (!description) {
    return null;
  }

  var id = "".concat(idSchema.$id, "__description");
  return React.createElement(DescriptionField, {
    id: id,
    description: description
  });
} // Used in the two templates


function DefaultArrayItem(props) {
  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  return React.createElement("div", {
    key: props.key,
    className: props.className
  }, React.createElement("div", {
    className: props.hasToolbar ? "col-xs-9" : "col-xs-12"
  }, props.children), props.hasToolbar && React.createElement("div", {
    className: "col-xs-3 array-item-toolbox"
  }, React.createElement("div", {
    className: "btn-group",
    style: {
      display: "flex",
      justifyContent: "space-around"
    }
  }, (props.hasMoveUp || props.hasMoveDown) && React.createElement(IconButton, {
    icon: "arrow-up",
    "aria-label": "Move up",
    className: "array-item-move-up",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveUp,
    onClick: props.onReorderClick(props.index, props.index - 1)
  }), (props.hasMoveUp || props.hasMoveDown) && React.createElement(IconButton, {
    icon: "arrow-down",
    className: "array-item-move-down",
    "aria-label": "Move down",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveDown,
    onClick: props.onReorderClick(props.index, props.index + 1)
  }), props.hasRemove && React.createElement(IconButton, {
    type: "danger",
    icon: "remove",
    "aria-label": "Remove",
    className: "array-item-remove",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly,
    onClick: props.onDropIndexClick(props.index)
  }))));
}

function DefaultFixedArrayFieldTemplate(props) {
  var _context;

  return React.createElement("fieldset", {
    className: props.className,
    id: props.idSchema.$id
  }, React.createElement(ArrayFieldTitle, {
    key: "array-field-title-".concat(props.idSchema.$id),
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema["ui:title"] || props.title,
    required: props.required
  }), (props.uiSchema["ui:description"] || props.schema.description) && React.createElement("div", {
    className: "field-description",
    key: "field-description-".concat(props.idSchema.$id)
  }, props.uiSchema["ui:description"] || props.schema.description), React.createElement("div", {
    className: "row array-item-list",
    key: "array-item-list-".concat(props.idSchema.$id)
  }, props.items && _mapInstanceProperty(_context = props.items).call(_context, DefaultArrayItem)), props.canAdd && React.createElement(AddButton, {
    className: "array-item-add",
    onClick: props.onAddClick,
    disabled: props.disabled || props.readonly
  }));
}

function DefaultNormalArrayFieldTemplate(props) {
  var _context2;

  return React.createElement("fieldset", {
    className: props.className,
    id: props.idSchema.$id
  }, React.createElement(ArrayFieldTitle, {
    key: "array-field-title-".concat(props.idSchema.$id),
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema["ui:title"] || props.title,
    required: props.required
  }), (props.uiSchema["ui:description"] || props.schema.description) && React.createElement(ArrayFieldDescription, {
    key: "array-field-description-".concat(props.idSchema.$id),
    DescriptionField: props.DescriptionField,
    idSchema: props.idSchema,
    description: props.uiSchema["ui:description"] || props.schema.description
  }), React.createElement("div", {
    className: "row array-item-list",
    key: "array-item-list-".concat(props.idSchema.$id)
  }, props.items && _mapInstanceProperty(_context2 = props.items).call(_context2, function (p) {
    return DefaultArrayItem(p);
  })), props.canAdd && React.createElement(AddButton, {
    className: "array-item-add",
    onClick: props.onAddClick,
    disabled: props.disabled || props.readonly
  }));
}

function generateRowId() {
  return shortid.generate();
}

function generateKeyedFormData(formData) {
  return !_Array$isArray(formData) ? [] : _mapInstanceProperty(formData).call(formData, function (item) {
    return {
      key: generateRowId(),
      item: item
    };
  });
}

function keyedToPlainFormData(keyedFormData) {
  return _mapInstanceProperty(keyedFormData).call(keyedFormData, function (keyedItem) {
    return keyedItem.item;
  });
}

var ArrayField =
/*#__PURE__*/
function (_Component) {
  _inherits(ArrayField, _Component);

  function ArrayField(props) {
    var _this;

    _classCallCheck(this, ArrayField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ArrayField).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_getNewFormDataRow", function () {
      var _this$props = _this.props,
          schema = _this$props.schema,
          _this$props$registry = _this$props.registry,
          registry = _this$props$registry === void 0 ? getDefaultRegistry() : _this$props$registry;
      var rootSchema = registry.rootSchema;
      var itemSchema = schema.items;

      if (isFixedItems(schema) && allowAdditionalItems(schema)) {
        itemSchema = schema.additionalItems;
      }

      return getDefaultFormState(itemSchema, undefined, rootSchema);
    });

    _defineProperty(_assertThisInitialized(_this), "onAddClick", function (event) {
      var _context3;

      if (event) {
        event.preventDefault();
      }

      var onChange = _this.props.onChange;
      var newKeyedFormDataRow = {
        key: generateRowId(),
        item: _this._getNewFormDataRow()
      };

      var newKeyedFormData = _concatInstanceProperty(_context3 = []).call(_context3, _toConsumableArray(_this.state.keyedFormData), [newKeyedFormDataRow]);

      _this.setState({
        keyedFormData: newKeyedFormData,
        updatedKeyedFormData: true
      }, function () {
        return onChange(keyedToPlainFormData(newKeyedFormData));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddIndexClick", function (index) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        var onChange = _this.props.onChange;
        var newKeyedFormDataRow = {
          key: generateRowId(),
          item: _this._getNewFormDataRow()
        };

        var newKeyedFormData = _toConsumableArray(_this.state.keyedFormData);

        _spliceInstanceProperty(newKeyedFormData).call(newKeyedFormData, index, 0, newKeyedFormDataRow);

        _this.setState({
          keyedFormData: newKeyedFormData,
          updatedKeyedFormData: true
        }, function () {
          return onChange(keyedToPlainFormData(newKeyedFormData));
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onDropIndexClick", function (index) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        var onChange = _this.props.onChange;
        var keyedFormData = _this.state.keyedFormData; // refs #195: revalidate to ensure properly reindexing errors

        var newErrorSchema;

        if (_this.props.errorSchema) {
          newErrorSchema = {};
          var errorSchema = _this.props.errorSchema;

          for (var i in errorSchema) {
            i = _parseInt(i);

            if (i < index) {
              newErrorSchema[i] = errorSchema[i];
            } else if (i > index) {
              newErrorSchema[i - 1] = errorSchema[i];
            }
          }
        }

        var newKeyedFormData = _filterInstanceProperty(keyedFormData).call(keyedFormData, function (_, i) {
          return i !== index;
        });

        _this.setState({
          keyedFormData: newKeyedFormData,
          updatedKeyedFormData: true
        }, function () {
          return onChange(keyedToPlainFormData(newKeyedFormData), newErrorSchema);
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onReorderClick", function (index, newIndex) {
      return function (event) {
        if (event) {
          event.preventDefault();
          event.target.blur();
        }

        var onChange = _this.props.onChange;
        var newErrorSchema;

        if (_this.props.errorSchema) {
          newErrorSchema = {};
          var errorSchema = _this.props.errorSchema;

          for (var i in errorSchema) {
            if (i == index) {
              newErrorSchema[newIndex] = errorSchema[index];
            } else if (i == newIndex) {
              newErrorSchema[index] = errorSchema[newIndex];
            } else {
              newErrorSchema[i] = errorSchema[i];
            }
          }
        }

        var keyedFormData = _this.state.keyedFormData;

        function reOrderArray() {
          // Copy item
          var _newKeyedFormData = _sliceInstanceProperty(keyedFormData).call(keyedFormData); // Moves item from index to newIndex


          _spliceInstanceProperty(_newKeyedFormData).call(_newKeyedFormData, index, 1);

          _spliceInstanceProperty(_newKeyedFormData).call(_newKeyedFormData, newIndex, 0, keyedFormData[index]);

          return _newKeyedFormData;
        }

        var newKeyedFormData = reOrderArray();

        _this.setState({
          keyedFormData: newKeyedFormData
        }, function () {
          return onChange(keyedToPlainFormData(newKeyedFormData), newErrorSchema);
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeForIndex", function (index) {
      return function (value, errorSchema) {
        var _this$props2 = _this.props,
            formData = _this$props2.formData,
            onChange = _this$props2.onChange;

        var newFormData = _mapInstanceProperty(formData).call(formData, function (item, i) {
          // We need to treat undefined items as nulls to have validation.
          // See https://github.com/tdegrunt/jsonschema/issues/206
          var jsonValue = typeof value === "undefined" ? null : value;
          return index === i ? jsonValue : item;
        });

        onChange(newFormData, errorSchema && _this.props.errorSchema && _objectSpread({}, _this.props.errorSchema, _defineProperty({}, index, errorSchema)));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectChange", function (value) {
      _this.props.onChange(value);
    });

    var _formData = props.formData;

    var _keyedFormData = generateKeyedFormData(_formData);

    _this.state = {
      keyedFormData: _keyedFormData,
      updatedKeyedFormData: false
    };
    return _this;
  }

  _createClass(ArrayField, [{
    key: "isItemRequired",
    value: function isItemRequired(itemSchema) {
      if (_Array$isArray(itemSchema.type)) {
        // While we don't yet support composite/nullable jsonschema types, it's
        // future-proof to check for requirement against these.
        return !includes(itemSchema.type, "null");
      } // All non-null array item types are inherently required by design


      return itemSchema.type !== "null";
    }
  }, {
    key: "canAddItem",
    value: function canAddItem(formItems) {
      var _this$props3 = this.props,
          schema = _this$props3.schema,
          uiSchema = _this$props3.uiSchema;

      var _getUiOptions = getUiOptions(uiSchema),
          addable = _getUiOptions.addable;

      if (addable !== false) {
        // if ui:options.addable was not explicitly set to false, we can add
        // another item if we have not exceeded maxItems yet
        if (schema.maxItems !== undefined) {
          addable = formItems.length < schema.maxItems;
        } else {
          addable = true;
        }
      }

      return addable;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          schema = _this$props4.schema,
          uiSchema = _this$props4.uiSchema,
          idSchema = _this$props4.idSchema,
          _this$props4$registry = _this$props4.registry,
          registry = _this$props4$registry === void 0 ? getDefaultRegistry() : _this$props4$registry;
      var rootSchema = registry.rootSchema;

      if (!schema.hasOwnProperty("items")) {
        var fields = registry.fields;
        var UnsupportedField = fields.UnsupportedField;
        return React.createElement(UnsupportedField, {
          schema: schema,
          idSchema: idSchema,
          reason: "Missing items definition"
        });
      }

      if (isFixedItems(schema)) {
        return this.renderFixedArray();
      }

      if (isFilesArray(schema, uiSchema, rootSchema)) {
        return this.renderFiles();
      }

      if (isMultiSelect(schema, rootSchema)) {
        return this.renderMultiSelect();
      }

      return this.renderNormalArray();
    }
  }, {
    key: "renderNormalArray",
    value: function renderNormalArray() {
      var _context4,
          _this2 = this;

      var _this$props5 = this.props,
          schema = _this$props5.schema,
          uiSchema = _this$props5.uiSchema,
          errorSchema = _this$props5.errorSchema,
          idSchema = _this$props5.idSchema,
          name = _this$props5.name,
          required = _this$props5.required,
          disabled = _this$props5.disabled,
          readonly = _this$props5.readonly,
          autofocus = _this$props5.autofocus,
          _this$props5$registry = _this$props5.registry,
          registry = _this$props5$registry === void 0 ? getDefaultRegistry() : _this$props5$registry,
          onBlur = _this$props5.onBlur,
          onFocus = _this$props5.onFocus,
          idPrefix = _this$props5.idPrefix,
          rawErrors = _this$props5.rawErrors;
      var title = schema.title === undefined ? name : schema.title;
      var ArrayFieldTemplate = registry.ArrayFieldTemplate,
          rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;
      var itemsSchema = retrieveSchema(schema.items, rootSchema);
      var formData = keyedToPlainFormData(this.state.keyedFormData);
      var arrayProps = {
        canAdd: this.canAddItem(formData),
        items: _mapInstanceProperty(_context4 = this.state.keyedFormData).call(_context4, function (keyedItem, index) {
          var key = keyedItem.key,
              item = keyedItem.item;
          var itemSchema = retrieveSchema(schema.items, rootSchema, item);
          var itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
          var itemIdPrefix = idSchema.$id + "_" + index;
          var itemIdSchema = toIdSchema(itemSchema, itemIdPrefix, rootSchema, item, idPrefix);
          return _this2.renderArrayFieldItem({
            key: key,
            index: index,
            canMoveUp: index > 0,
            canMoveDown: index < formData.length - 1,
            itemSchema: itemSchema,
            itemIdSchema: itemIdSchema,
            itemErrorSchema: itemErrorSchema,
            itemData: item,
            itemUiSchema: uiSchema.items,
            autofocus: autofocus && index === 0,
            onBlur: onBlur,
            onFocus: onFocus
          });
        }),
        className: "field field-array field-array-of-".concat(itemsSchema.type),
        DescriptionField: DescriptionField,
        disabled: disabled,
        idSchema: idSchema,
        uiSchema: uiSchema,
        onAddClick: this.onAddClick,
        readonly: readonly,
        required: required,
        schema: schema,
        title: title,
        TitleField: TitleField,
        formContext: formContext,
        formData: formData,
        rawErrors: rawErrors,
        registry: registry
      }; // Check if a custom render function was passed in

      var Component = uiSchema["ui:ArrayFieldTemplate"] || ArrayFieldTemplate || DefaultNormalArrayFieldTemplate;
      return React.createElement(Component, arrayProps);
    }
  }, {
    key: "renderMultiSelect",
    value: function renderMultiSelect() {
      var _this$props6 = this.props,
          schema = _this$props6.schema,
          idSchema = _this$props6.idSchema,
          uiSchema = _this$props6.uiSchema,
          formData = _this$props6.formData,
          disabled = _this$props6.disabled,
          readonly = _this$props6.readonly,
          required = _this$props6.required,
          label = _this$props6.label,
          placeholder = _this$props6.placeholder,
          autofocus = _this$props6.autofocus,
          onBlur = _this$props6.onBlur,
          onFocus = _this$props6.onFocus,
          _this$props6$registry = _this$props6.registry,
          registry = _this$props6$registry === void 0 ? getDefaultRegistry() : _this$props6$registry,
          rawErrors = _this$props6.rawErrors;
      var items = this.props.formData;
      var widgets = registry.widgets,
          rootSchema = registry.rootSchema,
          formContext = registry.formContext;
      var itemsSchema = retrieveSchema(schema.items, rootSchema, formData);
      var enumOptions = optionsList(itemsSchema);

      var _getUiOptions$enumOpt = _objectSpread({}, getUiOptions(uiSchema), {
        enumOptions: enumOptions
      }),
          _getUiOptions$enumOpt2 = _getUiOptions$enumOpt.widget,
          widget = _getUiOptions$enumOpt2 === void 0 ? "select" : _getUiOptions$enumOpt2,
          options = _objectWithoutProperties(_getUiOptions$enumOpt, ["widget"]);

      var Widget = getWidget(schema, widget, widgets);
      return React.createElement(Widget, {
        id: idSchema && idSchema.$id,
        multiple: true,
        onChange: this.onSelectChange,
        onBlur: onBlur,
        onFocus: onFocus,
        options: options,
        schema: schema,
        registry: registry,
        value: items,
        disabled: disabled,
        readonly: readonly,
        required: required,
        label: label,
        placeholder: placeholder,
        formContext: formContext,
        autofocus: autofocus,
        rawErrors: rawErrors
      });
    }
  }, {
    key: "renderFiles",
    value: function renderFiles() {
      var _this$props7 = this.props,
          schema = _this$props7.schema,
          uiSchema = _this$props7.uiSchema,
          idSchema = _this$props7.idSchema,
          name = _this$props7.name,
          disabled = _this$props7.disabled,
          readonly = _this$props7.readonly,
          autofocus = _this$props7.autofocus,
          onBlur = _this$props7.onBlur,
          onFocus = _this$props7.onFocus,
          _this$props7$registry = _this$props7.registry,
          registry = _this$props7$registry === void 0 ? getDefaultRegistry() : _this$props7$registry,
          rawErrors = _this$props7.rawErrors;
      var title = schema.title || name;
      var items = this.props.formData;
      var widgets = registry.widgets,
          formContext = registry.formContext;

      var _getUiOptions2 = getUiOptions(uiSchema),
          _getUiOptions2$widget = _getUiOptions2.widget,
          widget = _getUiOptions2$widget === void 0 ? "files" : _getUiOptions2$widget,
          options = _objectWithoutProperties(_getUiOptions2, ["widget"]);

      var Widget = getWidget(schema, widget, widgets);
      return React.createElement(Widget, {
        options: options,
        id: idSchema && idSchema.$id,
        multiple: true,
        onChange: this.onSelectChange,
        onBlur: onBlur,
        onFocus: onFocus,
        schema: schema,
        title: title,
        value: items,
        disabled: disabled,
        readonly: readonly,
        formContext: formContext,
        autofocus: autofocus,
        rawErrors: rawErrors
      });
    }
  }, {
    key: "renderFixedArray",
    value: function renderFixedArray() {
      var _context5,
          _context6,
          _this3 = this;

      var _this$props8 = this.props,
          schema = _this$props8.schema,
          uiSchema = _this$props8.uiSchema,
          formData = _this$props8.formData,
          errorSchema = _this$props8.errorSchema,
          idPrefix = _this$props8.idPrefix,
          idSchema = _this$props8.idSchema,
          name = _this$props8.name,
          required = _this$props8.required,
          disabled = _this$props8.disabled,
          readonly = _this$props8.readonly,
          autofocus = _this$props8.autofocus,
          _this$props8$registry = _this$props8.registry,
          registry = _this$props8$registry === void 0 ? getDefaultRegistry() : _this$props8$registry,
          onBlur = _this$props8.onBlur,
          onFocus = _this$props8.onFocus,
          rawErrors = _this$props8.rawErrors;
      var title = schema.title || name;
      var items = this.props.formData;
      var ArrayFieldTemplate = registry.ArrayFieldTemplate,
          rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var TitleField = fields.TitleField;

      var itemSchemas = _mapInstanceProperty(_context5 = schema.items).call(_context5, function (item, index) {
        return retrieveSchema(item, rootSchema, formData[index]);
      });

      var additionalSchema = allowAdditionalItems(schema) ? retrieveSchema(schema.additionalItems, rootSchema, formData) : null;

      if (!items || items.length < itemSchemas.length) {
        // to make sure at least all fixed items are generated
        items = items || [];
        items = _concatInstanceProperty(items).call(items, new Array(itemSchemas.length - items.length));
      } // These are the props passed into the render function


      var arrayProps = {
        canAdd: this.canAddItem(items) && additionalSchema,
        className: "field field-array field-array-fixed-items",
        disabled: disabled,
        idSchema: idSchema,
        formData: formData,
        items: _mapInstanceProperty(_context6 = this.state.keyedFormData).call(_context6, function (keyedItem, index) {
          var key = keyedItem.key,
              item = keyedItem.item;
          var additional = index >= itemSchemas.length;
          var itemSchema = additional ? retrieveSchema(schema.additionalItems, rootSchema, item) : itemSchemas[index];
          var itemIdPrefix = idSchema.$id + "_" + index;
          var itemIdSchema = toIdSchema(itemSchema, itemIdPrefix, rootSchema, item, idPrefix);
          var itemUiSchema = additional ? uiSchema.additionalItems || {} : _Array$isArray(uiSchema.items) ? uiSchema.items[index] : uiSchema.items || {};
          var itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
          return _this3.renderArrayFieldItem({
            key: key,
            index: index,
            canRemove: additional,
            canMoveUp: index >= itemSchemas.length + 1,
            canMoveDown: additional && index < items.length - 1,
            itemSchema: itemSchema,
            itemData: item,
            itemUiSchema: itemUiSchema,
            itemIdSchema: itemIdSchema,
            itemErrorSchema: itemErrorSchema,
            autofocus: autofocus && index === 0,
            onBlur: onBlur,
            onFocus: onFocus
          });
        }),
        onAddClick: this.onAddClick,
        readonly: readonly,
        required: required,
        schema: schema,
        uiSchema: uiSchema,
        title: title,
        TitleField: TitleField,
        formContext: formContext,
        rawErrors: rawErrors
      }; // Check if a custom template template was passed in

      var Template = uiSchema["ui:ArrayFieldTemplate"] || ArrayFieldTemplate || DefaultFixedArrayFieldTemplate;
      return React.createElement(Template, arrayProps);
    }
  }, {
    key: "renderArrayFieldItem",
    value: function renderArrayFieldItem(props) {
      var _context7;

      var key = props.key,
          index = props.index,
          _props$canRemove = props.canRemove,
          canRemove = _props$canRemove === void 0 ? true : _props$canRemove,
          _props$canMoveUp = props.canMoveUp,
          canMoveUp = _props$canMoveUp === void 0 ? true : _props$canMoveUp,
          _props$canMoveDown = props.canMoveDown,
          canMoveDown = _props$canMoveDown === void 0 ? true : _props$canMoveDown,
          itemSchema = props.itemSchema,
          itemData = props.itemData,
          itemUiSchema = props.itemUiSchema,
          itemIdSchema = props.itemIdSchema,
          itemErrorSchema = props.itemErrorSchema,
          autofocus = props.autofocus,
          onBlur = props.onBlur,
          onFocus = props.onFocus,
          rawErrors = props.rawErrors;
      var _this$props9 = this.props,
          disabled = _this$props9.disabled,
          readonly = _this$props9.readonly,
          uiSchema = _this$props9.uiSchema,
          _this$props9$registry = _this$props9.registry,
          registry = _this$props9$registry === void 0 ? getDefaultRegistry() : _this$props9$registry;
      var SchemaField = registry.fields.SchemaField;

      var _orderable$removable$ = _objectSpread({
        orderable: true,
        removable: true
      }, uiSchema["ui:options"]),
          orderable = _orderable$removable$.orderable,
          removable = _orderable$removable$.removable;

      var has = {
        moveUp: orderable && canMoveUp,
        moveDown: orderable && canMoveDown,
        remove: removable && canRemove
      };
      has.toolbar = _someInstanceProperty(_context7 = _Object$keys(has)).call(_context7, function (key) {
        return has[key];
      });
      return {
        children: React.createElement(SchemaField, {
          index: index,
          schema: itemSchema,
          uiSchema: itemUiSchema,
          formData: itemData,
          errorSchema: itemErrorSchema,
          idSchema: itemIdSchema,
          required: this.isItemRequired(itemSchema),
          onChange: this.onChangeForIndex(index),
          onBlur: onBlur,
          onFocus: onFocus,
          registry: this.props.registry,
          disabled: this.props.disabled,
          readonly: this.props.readonly,
          autofocus: autofocus,
          rawErrors: rawErrors
        }),
        className: "array-item",
        disabled: disabled,
        hasToolbar: has.toolbar,
        hasMoveUp: has.moveUp,
        hasMoveDown: has.moveDown,
        hasRemove: has.remove,
        index: index,
        key: key,
        onAddIndexClick: this.onAddIndexClick,
        onDropIndexClick: this.onDropIndexClick,
        onReorderClick: this.onReorderClick,
        readonly: readonly
      };
    }
  }, {
    key: "itemTitle",
    get: function get() {
      var schema = this.props.schema;
      return schema.items.title || schema.items.description || "Item";
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      // Don't call getDerivedStateFromProps if keyed formdata was just updated.
      if (prevState.updatedKeyedFormData) {
        return {
          updatedKeyedFormData: false
        };
      }

      var nextFormData = nextProps.formData;
      var previousKeyedFormData = prevState.keyedFormData;
      var newKeyedFormData = nextFormData.length === previousKeyedFormData.length ? _mapInstanceProperty(previousKeyedFormData).call(previousKeyedFormData, function (previousKeyedFormDatum, index) {
        return {
          key: previousKeyedFormDatum.key,
          item: nextFormData[index]
        };
      }) : generateKeyedFormData(nextFormData);
      return {
        keyedFormData: newKeyedFormData
      };
    }
  }]);

  return ArrayField;
}(Component);

_defineProperty(ArrayField, "defaultProps", {
  uiSchema: {},
  formData: [],
  idSchema: {},
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false
});

if (process.env.NODE_ENV !== "production") {
  ArrayField.propTypes = types.fieldProps;
}

export default ArrayField;