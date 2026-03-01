import { z } from 'zod';
export declare const weightSchema: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
export declare const styleSchema: z.ZodEnum<["normal", "italic", "oblique"]>;
export declare const displaySchema: z.ZodEnum<["auto", "block", "swap", "fallback", "optional"]>;
export declare const localFontFamilySchema: z.ZodObject<{
    provider: z.ZodLiteral<"local">;
    variants: z.ZodArray<z.ZodObject<{
        src: z.ZodArray<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodType<URL, z.ZodTypeDef, URL>]>, z.ZodObject<{
            url: z.ZodUnion<[z.ZodString, z.ZodType<URL, z.ZodTypeDef, URL>]>;
            tech: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            url: string | URL;
            tech?: string | undefined;
        }, {
            url: string | URL;
            tech?: string | undefined;
        }>]>, "atleastone">;
        weight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        style: z.ZodOptional<z.ZodEnum<["normal", "italic", "oblique"]>>;
        display: z.ZodOptional<z.ZodEnum<["auto", "block", "swap", "fallback", "optional"]>>;
        stretch: z.ZodOptional<z.ZodString>;
        featureSettings: z.ZodOptional<z.ZodString>;
        variationSettings: z.ZodOptional<z.ZodString>;
        unicodeRange: z.ZodOptional<z.ZodArray<z.ZodString, "atleastone">>;
    }, "strict", z.ZodTypeAny, {
        src: [string | URL | {
            url: string | URL;
            tech?: string | undefined;
        }, ...(string | URL | {
            url: string | URL;
            tech?: string | undefined;
        })[]];
        weight?: string | number | undefined;
        style?: "normal" | "italic" | "oblique" | undefined;
        display?: "auto" | "block" | "swap" | "fallback" | "optional" | undefined;
        stretch?: string | undefined;
        featureSettings?: string | undefined;
        variationSettings?: string | undefined;
        unicodeRange?: [string, ...string[]] | undefined;
    }, {
        src: [string | URL | {
            url: string | URL;
            tech?: string | undefined;
        }, ...(string | URL | {
            url: string | URL;
            tech?: string | undefined;
        })[]];
        weight?: string | number | undefined;
        style?: "normal" | "italic" | "oblique" | undefined;
        display?: "auto" | "block" | "swap" | "fallback" | "optional" | undefined;
        stretch?: string | undefined;
        featureSettings?: string | undefined;
        variationSettings?: string | undefined;
        unicodeRange?: [string, ...string[]] | undefined;
    }>, "atleastone">;
    fallbacks: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    optimizedFallbacks: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodString;
    cssVariable: z.ZodString;
}, "strict", z.ZodTypeAny, {
    provider: "local";
    name: string;
    cssVariable: string;
    variants: [{
        src: [string | URL | {
            url: string | URL;
            tech?: string | undefined;
        }, ...(string | URL | {
            url: string | URL;
            tech?: string | undefined;
        })[]];
        weight?: string | number | undefined;
        style?: "normal" | "italic" | "oblique" | undefined;
        display?: "auto" | "block" | "swap" | "fallback" | "optional" | undefined;
        stretch?: string | undefined;
        featureSettings?: string | undefined;
        variationSettings?: string | undefined;
        unicodeRange?: [string, ...string[]] | undefined;
    }, ...{
        src: [string | URL | {
            url: string | URL;
            tech?: string | undefined;
        }, ...(string | URL | {
            url: string | URL;
            tech?: string | undefined;
        })[]];
        weight?: string | number | undefined;
        style?: "normal" | "italic" | "oblique" | undefined;
        display?: "auto" | "block" | "swap" | "fallback" | "optional" | undefined;
        stretch?: string | undefined;
        featureSettings?: string | undefined;
        variationSettings?: string | undefined;
        unicodeRange?: [string, ...string[]] | undefined;
    }[]];
    fallbacks?: string[] | undefined;
    optimizedFallbacks?: boolean | undefined;
}, {
    provider: "local";
    name: string;
    cssVariable: string;
    variants: [{
        src: [string | URL | {
            url: string | URL;
            tech?: string | undefined;
        }, ...(string | URL | {
            url: string | URL;
            tech?: string | undefined;
        })[]];
        weight?: string | number | undefined;
        style?: "normal" | "italic" | "oblique" | undefined;
        display?: "auto" | "block" | "swap" | "fallback" | "optional" | undefined;
        stretch?: string | undefined;
        featureSettings?: string | undefined;
        variationSettings?: string | undefined;
        unicodeRange?: [string, ...string[]] | undefined;
    }, ...{
        src: [string | URL | {
            url: string | URL;
            tech?: string | undefined;
        }, ...(string | URL | {
            url: string | URL;
            tech?: string | undefined;
        })[]];
        weight?: string | number | undefined;
        style?: "normal" | "italic" | "oblique" | undefined;
        display?: "auto" | "block" | "swap" | "fallback" | "optional" | undefined;
        stretch?: string | undefined;
        featureSettings?: string | undefined;
        variationSettings?: string | undefined;
        unicodeRange?: [string, ...string[]] | undefined;
    }[]];
    fallbacks?: string[] | undefined;
    optimizedFallbacks?: boolean | undefined;
}>;
export declare const remoteFontFamilySchema: z.ZodObject<{
    provider: z.ZodObject<{
        entrypoint: z.ZodUnion<[z.ZodString, z.ZodType<URL, z.ZodTypeDef, URL>]>;
        config: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strict", z.ZodTypeAny, {
        entrypoint: string | URL;
        config?: Record<string, any> | undefined;
    }, {
        entrypoint: string | URL;
        config?: Record<string, any> | undefined;
    }>;
    weights: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "atleastone">>;
    styles: z.ZodOptional<z.ZodArray<z.ZodEnum<["normal", "italic", "oblique"]>, "atleastone">>;
    subsets: z.ZodOptional<z.ZodArray<z.ZodString, "atleastone">>;
    display: z.ZodOptional<z.ZodEnum<["auto", "block", "swap", "fallback", "optional"]>>;
    stretch: z.ZodOptional<z.ZodString>;
    featureSettings: z.ZodOptional<z.ZodString>;
    variationSettings: z.ZodOptional<z.ZodString>;
    unicodeRange: z.ZodOptional<z.ZodArray<z.ZodString, "atleastone">>;
    fallbacks: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    optimizedFallbacks: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodString;
    cssVariable: z.ZodString;
}, "strict", z.ZodTypeAny, {
    provider: {
        entrypoint: string | URL;
        config?: Record<string, any> | undefined;
    };
    name: string;
    cssVariable: string;
    weights?: [string | number, ...(string | number)[]] | undefined;
    styles?: ["normal" | "italic" | "oblique", ...("normal" | "italic" | "oblique")[]] | undefined;
    subsets?: [string, ...string[]] | undefined;
    fallbacks?: string[] | undefined;
    optimizedFallbacks?: boolean | undefined;
    display?: "auto" | "block" | "swap" | "fallback" | "optional" | undefined;
    stretch?: string | undefined;
    featureSettings?: string | undefined;
    variationSettings?: string | undefined;
    unicodeRange?: [string, ...string[]] | undefined;
}, {
    provider: {
        entrypoint: string | URL;
        config?: Record<string, any> | undefined;
    };
    name: string;
    cssVariable: string;
    weights?: [string | number, ...(string | number)[]] | undefined;
    styles?: ["normal" | "italic" | "oblique", ...("normal" | "italic" | "oblique")[]] | undefined;
    subsets?: [string, ...string[]] | undefined;
    fallbacks?: string[] | undefined;
    optimizedFallbacks?: boolean | undefined;
    display?: "auto" | "block" | "swap" | "fallback" | "optional" | undefined;
    stretch?: string | undefined;
    featureSettings?: string | undefined;
    variationSettings?: string | undefined;
    unicodeRange?: [string, ...string[]] | undefined;
}>;
