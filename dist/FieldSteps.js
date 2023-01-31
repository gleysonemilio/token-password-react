"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSteps = void 0;
const react_1 = __importStar(require("react"));
require("./Styles.css");
const FieldSteps = ({ onSendValue, lengthField = 6, error, color = '' }) => {
    const [fieldArray, setFieldArray] = (0, react_1.useState)(['']);
    (0, react_1.useEffect)(() => {
        const arrayInitDefault = Array.from({ length: lengthField }, () => '');
        setFieldArray(arrayInitDefault);
    }, [lengthField]);
    (0, react_1.useEffect)(() => {
        if (fieldArray[lengthField - 1] !== '') {
            onSendValue(fieldArray.join(''));
        }
    }, [fieldArray]);
    const handleDocumentByIdFocusInput = (number) => {
        var _a;
        return (_a = document.getElementById(`text-input-${number}`)) === null || _a === void 0 ? void 0 : _a.focus();
    };
    const handleSetFieldArray = (0, react_1.useCallback)((value, index) => {
        return setFieldArray(fieldArray.map((row, idx) => (index !== idx ? row : value)));
    }, [fieldArray]);
    const handleSetSingleValue = (0, react_1.useCallback)((value, index) => {
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
    const handleRemoveValue = (index) => {
        handleDocumentByIdFocusInput(index - 1);
        handleSetFieldArray('', index);
        if (fieldArray[index] !== '') {
            handleDocumentByIdFocusInput(index);
        }
    };
    const handleSetTwoValue = (value, index) => {
        const nextPosition = index + 1;
        handleSetFieldArray(value, nextPosition);
        handleDocumentByIdFocusInput(nextPosition);
    };
    const handleValidationErrorBorderField = (0, react_1.useCallback)((index) => {
        if (error) {
            return `2px solid ${color}`;
        }
        if (!error && fieldArray[index] !== '') {
            return `2px solid ${color}`;
        }
        return '';
    }, [error, fieldArray]);
    return (react_1.default.createElement("div", { className: "container" }, fieldArray &&
        fieldArray.map((_row, index) => (react_1.default.createElement("input", { key: index, type: "text", id: `text-input-${index}`, style: {
                height: '0',
                padding: '32px 0 28px 0',
                border: handleValidationErrorBorderField(index)
            }, name: "token-password-react", value: fieldArray[index], maxLength: index > 0 ? 2 : lengthField, minLength: index > 0 ? 2 : lengthField, autoFocus: index === 0, onKeyDown: (e) => {
                if (e.key === 'ArrowRight') {
                    return handleDocumentByIdFocusInput(index + 1);
                }
                if (e.key === 'ArrowLeft') {
                    return handleDocumentByIdFocusInput(index - 1);
                }
                if (e.key === 'Backspace') {
                    return handleRemoveValue(index);
                }
            }, onChange: (e) => {
                const value = e.target.value;
                if (value.length === 2) {
                    return handleSetTwoValue(value.split('')[1], index);
                }
                handleSetSingleValue(value, index);
            }, pattern: "[false0-9]*", inputMode: "numeric" })))));
};
exports.FieldSteps = FieldSteps;
