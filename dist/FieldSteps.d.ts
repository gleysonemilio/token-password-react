/// <reference types="react" />
import './Styles.css';
interface Props {
    onSendValue: (value: string) => void;
    lengthField?: number;
    error?: boolean;
    color?: string;
}
export declare const FieldSteps: ({ onSendValue, lengthField, error, color }: Props) => JSX.Element;
export {};
