declare const styles: readonly ["purple", "gray", "red", "green", "yellow", "blue"];
type SelectStyle = (typeof styles)[number];
export declare class DevToolbarSelect extends HTMLElement {
    shadowRoot: ShadowRoot;
    element: HTMLSelectElement;
    _selectStyle: SelectStyle;
    get selectStyle(): "red" | "blue" | "green" | "yellow" | "purple" | "gray";
    set selectStyle(value: "red" | "blue" | "green" | "yellow" | "purple" | "gray");
    static observedAttributes: string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(): void;
    updateStyle(): void;
}
export {};
