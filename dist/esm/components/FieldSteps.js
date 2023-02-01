import React, { useCallback, useEffect, useState } from 'react';
import './Styles.css';
var FieldSteps = function (_a) {
    var onSendValue = _a.onSendValue, _b = _a.lengthField, lengthField = _b === void 0 ? 6 : _b, error = _a.error, _c = _a.color, color = _c === void 0 ? '' : _c;
    var _d = useState(['']), fieldArray = _d[0], setFieldArray = _d[1];
    useEffect(function () {
        var arrayInitDefault = Array.from({ length: lengthField }, function () { return ''; });
        setFieldArray(arrayInitDefault);
    }, [lengthField]);
    useEffect(function () {
        if (fieldArray[lengthField - 1] !== '') {
            onSendValue(fieldArray.join(''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldArray]);
    var handleDocumentByIdFocusInput = function (number) {
        var _a;
        return (_a = document.getElementById("text-input-".concat(number))) === null || _a === void 0 ? void 0 : _a.focus();
    };
    var handleSetFieldArray = useCallback(function (value, index) {
        return setFieldArray(fieldArray.map(function (row, idx) { return (index !== idx ? row : value); }));
    }, [fieldArray]);
    var handleSetSingleValue = useCallback(function (value, index) {
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
    var handleValidationErrorBorderField = useCallback(function (index) {
        if (error) {
            return "2px solid ".concat(color);
        }
        if (!error && fieldArray[index] !== '') {
            return "2px solid ".concat(color);
        }
        return '';
    }, [error, fieldArray]);
    return (React.createElement("div", { className: "container" }, fieldArray &&
        fieldArray.map(function (_row, index) { return (React.createElement("input", { key: index, type: "text", id: "text-input-".concat(index), style: {
                height: '0',
                padding: '32px 0 28px 0',
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
            }, pattern: "[false0-9]*", inputMode: "numeric" })); })));
};
export default FieldSteps;
//# sourceMappingURL=FieldSteps.js.map