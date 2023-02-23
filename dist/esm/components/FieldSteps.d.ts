import { HTMLInputTypeAttribute } from 'react';
interface Props {
    onSendValue: (value: string) => void;
    lengthField?: number;
    error?: boolean;
    type?: HTMLInputTypeAttribute;
    color?: string;
}
export declare const TextInput: import("styled-components").StyledComponent<"input", any, {}, never>;
export declare const Container: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const ContainerInput: import("styled-components").StyledComponent<"div", any, {}, never>;
declare const FieldSteps: ({ onSendValue, lengthField, error, type, color }: Props) => JSX.Element;
export default FieldSteps;
