declare const styles: readonly ["purple", "gray", "red", "green", "yellow", "blue"];
type ToggleStyle = (typeof styles)[number];
export declare class DevToolbarToggle extends HTMLElement {
    shadowRoot: ShadowRoot;
    input: HTMLInputElement;
    _toggleStyle: ToggleStyle;
    get toggleStyle(): "red" | "blue" | "green" | "yellow" | "purple" | "gray";
    set toggleStyle(value: "red" | "blue" | "green" | "yellow" | "purple" | "gray");
    static observedAttributes: string[];
    constructor();
    attributeChangedCallback(): void;
    updateStyle(): void;
    connectedCallback(): void;
    get value(): string;
    set value(val: string);
}
export {};
