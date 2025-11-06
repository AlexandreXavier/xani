export declare class DevToolbarRadioCheckbox extends HTMLElement {
    private _radioStyle;
    input: HTMLInputElement;
    shadowRoot: ShadowRoot;
    get radioStyle(): "red" | "blue" | "green" | "yellow" | "purple" | "gray";
    set radioStyle(value: "red" | "blue" | "green" | "yellow" | "purple" | "gray");
    static observedAttributes: string[];
    constructor();
    connectedCallback(): void;
    updateStyle(): void;
    updateInputState(): void;
    attributeChangedCallback(): void;
}
