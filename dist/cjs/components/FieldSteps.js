"use strict";
exports.__esModule = true;
exports.ContainerInput = exports.Container = exports.TextInput = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
exports.TextInput = styled_components_1["default"].input(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  height: 0;\n  width: 100%;\n  padding: 32px 0 28px 0;\n\n  font-size: 1.8rem;\n  letter-spacing: -1px;\n  line-height: 40px;\n  font-weight: 300;\n"], ["\n  height: 0;\n  width: 100%;\n  padding: 32px 0 28px 0;\n\n  font-size: 1.8rem;\n  letter-spacing: -1px;\n  line-height: 40px;\n  font-weight: 300;\n"])));
exports.Container = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n"], ["\n  display: flex;\n  flex-direction: column;\n"])));
exports.ContainerInput = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  gap: 5px;\n  margin: 10px 0px 10px 0px;\n\n  input {\n    text-align: center;\n    justify-content: center;\n    border-radius: 5px;\n  }\n"], ["\n  display: flex;\n  gap: 5px;\n  margin: 10px 0px 10px 0px;\n\n  input {\n    text-align: center;\n    justify-content: center;\n    border-radius: 5px;\n  }\n"])));
var FieldSteps = function (_a) {
    var onSendValue = _a.onSendValue, _b = _a.lengthField, lengthField = _b === void 0 ? 6 : _b, _c = _a.error, error = _c === void 0 ? false : _c, _d = _a.type, type = _d === void 0 ? 'text' : _d, _e = _a.color, color = _e === void 0 ? '#00e967' : _e;
    var _f = (0, react_1.useState)(['']), fieldArray = _f[0], setFieldArray = _f[1];
    (0, react_1.useEffect)(function () {
        var arrayInitDefault = Array.from({ length: lengthField }, function () { return ''; });
        setFieldArray(arrayInitDefault);
    }, [lengthField]);
    (0, react_1.useEffect)(function () {
        if (fieldArray[lengthField - 1] !== '') {
            onSendValue(fieldArray.join(''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldArray]);
    var handleDocumentByIdFocusInput = function (number) {
        var _a;
        return (_a = document.getElementById("text-input-".concat(number))) === null || _a === void 0 ? void 0 : _a.focus();
    };
    var handleSetFieldArray = (0, react_1.useCallback)(function (value, index) {
        return setFieldArray(fieldArray.map(function (row, idx) { return (index !== idx ? row : value); }));
    }, [fieldArray]);
    var handleSetSingleValue = (0, react_1.useCallback)(function (value, index) {
        if (!value) {
            return '';
        }
        if (value.length === lengthField) {
            setFieldArray([]);
            handleDocumentByIdFocusInput(fieldArray.length - 1);
            return setFieldArray(value.split(''));
        }
        handleSetFieldArray(value, index);
        handleDocumentByIdFocusInput(index + 1);
    }, [fieldArray, lengthField, handleSetFieldArray]);
    var handleRemoveValue = function (index) {
        handleDocumentByIdFocusInput(index - 1);
        handleSetFieldArray('', index);
        if (fieldArray[index] !== '') {
            handleDocumentByIdFocusInput(index);
        }
    };
    var handleSetTwoValue = function (value, index) {
        var nextPosition = index + 1;
        handleSetFieldArray(value, nextPosition);
        handleDocumentByIdFocusInput(nextPosition);
    };
    var handleValidationErrorBorderField = (0, react_1.useCallback)(function (index) {
        console.log('erro', error);
        if (error) {
            return "1px solid #d13131";
        }
        if (!error && fieldArray[index] !== '') {
            return "1px solid ".concat(color);
        }
        return '1px solid #ddd';
    }, [error, fieldArray]);
    return (react_1["default"].createElement(exports.Container, null,
        react_1["default"].createElement(exports.ContainerInput, null, fieldArray &&
            fieldArray.map(function (_row, index) { return (react_1["default"].createElement(exports.TextInput, { key: index, type: type, id: "text-input-".concat(index), style: {
                    border: handleValidationErrorBorderField(index)
                }, name: "token-password-react", value: fieldArray[index], maxLength: index > 0 ? 2 : lengthField, minLength: index > 0 ? 2 : lengthField, autoFocus: index === 0, onKeyDown: function (e) {
                    if (e.key === 'ArrowRight') {
                        return handleDocumentByIdFocusInput(index + 1);
                    }
                    if (e.key === 'ArrowLeft') {
                        return handleDocumentByIdFocusInput(index - 1);
                    }
                    if (e.key === 'Backspace') {
                        return handleRemoveValue(index);
                    }
                }, onChange: function (e) {
                    var value = e.target.value;
                    if (value.length === 2) {
                        return handleSetTwoValue(value.split('')[1], index);
                    }
                    handleSetSingleValue(value, index);
                }, pattern: "[false0-9]*", inputMode: "numeric" })); }))));
};
exports["default"] = FieldSteps;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=FieldSteps.js.map