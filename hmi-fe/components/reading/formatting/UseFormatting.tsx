import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

// Types for formatting options
export type FontWeight = 'normal' | 'bold';
export type FontStyle = 'normal' | 'italic';
export type TextDecoration = 'none' | 'underline';

interface FormattingContextType {
    fontSize: number;
    setFontSize: (size: number) => void;
    fontFamily: string;
    setFontFamily: (family: string) => void;
    fontWeight: FontWeight;
    setFontWeight: (weight: FontWeight) => void;
    fontStyle: FontStyle;
    setFontStyle: (style: FontStyle) => void;
    textDecoration: TextDecoration;
    setTextDecoration: (decoration: TextDecoration) => void;
    lineHeight: number;
    setLineHeight: (height: number) => void;
    letterSpacing: number;
    setLetterSpacing: (spacing: number) => void;
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
    readingRuler: boolean;
    setReadingRuler: (enabled: boolean) => void;
    rulerHeight: number;
    setRulerHeight: (height: number) => void;
    rulerColor: string;
    setRulerColor: (color: string) => void;
    readingMask: boolean;
    setReadingMask: (enabled: boolean) => void;
}

const FormattingContext = createContext<FormattingContextType | undefined>(undefined);

export const FormattingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Default state (for SSR)
    const [fontSize, setFontSize] = useState<number>(16);
    const [fontFamily, setFontFamily] = useState<string>('Inter');
    const [fontWeight, setFontWeight] = useState<FontWeight>('normal');
    const [fontStyle, setFontStyle] = useState<FontStyle>('normal');
    const [textDecoration, setTextDecoration] = useState<TextDecoration>('none');
    const [lineHeight, setLineHeight] = useState<number>(1.5);
    const [letterSpacing, setLetterSpacing] = useState<number>(0);
    const [backgroundColor, setBackgroundColor] = useState<string>('#F4F4F5');
    const [readingRuler, setReadingRuler] = useState<boolean>(false);
    const [rulerHeight, setRulerHeight] = useState<number>(2);
    const [rulerColor, setRulerColor] = useState<string>('#6B7280');
    const [readingMask, setReadingMask] = useState<boolean>(false);

    // This state ensures cookies are loaded after the first render
    const [cookiesLoaded, setCookiesLoaded] = useState<boolean>(false);

    // Only set the state after the component mounts (on the client side)
    useEffect(() => {
        const savedFontSize = parseInt(Cookies.get('fontSize') || '16');
        const savedFontFamily = Cookies.get('fontFamily') || 'Inter';
        const savedFontWeight = Cookies.get('fontWeight') as FontWeight || 'normal';
        const savedFontStyle = Cookies.get('fontStyle') as FontStyle || 'normal';
        const savedTextDecoration = Cookies.get('textDecoration') as TextDecoration || 'none';
        const savedLineHeight = parseFloat(Cookies.get('lineHeight') || '1.5');
        const savedLetterSpacing = parseFloat(Cookies.get('letterSpacing') || '0');
        const savedBackgroundColor = Cookies.get('backgroundColor') || '#F4F4F5';
        const savedReadingRuler = Cookies.get('readingRuler') === 'true';
        const savedRulerHeight = parseInt(Cookies.get('rulerHeight') || '2');
        const savedRulerColor = Cookies.get('rulerColor') || '#6B7280';
        const savedReadingMask = Cookies.get('readingMask') === 'true';

        // Only update state after cookies are loaded
        setFontSize(savedFontSize);
        setFontFamily(savedFontFamily);
        setFontWeight(savedFontWeight);
        setFontStyle(savedFontStyle);
        setTextDecoration(savedTextDecoration);
        setLineHeight(savedLineHeight);
        setLetterSpacing(savedLetterSpacing);
        setBackgroundColor(savedBackgroundColor);
        setReadingRuler(savedReadingRuler);
        setRulerHeight(savedRulerHeight);
        setRulerColor(savedRulerColor);
        setReadingMask(savedReadingMask);

        setCookiesLoaded(true); // Mark cookies as loaded
    }, []);

    // Save settings to cookies on any change
    useEffect(() => {
        if (cookiesLoaded) { // Only set cookies after the initial render
            Cookies.set('fontSize', fontSize.toString(), { expires: 365 });
            Cookies.set('fontFamily', fontFamily, { expires: 365 });
            Cookies.set('fontWeight', fontWeight, { expires: 365 });
            Cookies.set('fontStyle', fontStyle, { expires: 365 });
            Cookies.set('textDecoration', textDecoration, { expires: 365 });
            Cookies.set('lineHeight', lineHeight.toString(), { expires: 365 });
            Cookies.set('letterSpacing', letterSpacing.toString(), { expires: 365 });
            Cookies.set('backgroundColor', backgroundColor, { expires: 365 });
            Cookies.set('readingRuler', readingRuler.toString(), { expires: 365 });
            Cookies.set('rulerHeight', rulerHeight.toString(), { expires: 365 });
            Cookies.set('rulerColor', rulerColor, { expires: 365 });
            Cookies.set('readingMask', readingMask.toString(), { expires: 365 });
        }
    }, [
        cookiesLoaded,
        fontSize,
        fontFamily,
        fontWeight,
        fontStyle,
        textDecoration,
        lineHeight,
        letterSpacing,
        backgroundColor,
        readingRuler,
        rulerHeight,
        rulerColor,
        readingMask
    ]);

    // To avoid hydration mismatch, only render once cookies are loaded
    if (!cookiesLoaded) {
        return null; // This avoids the page flash between defaults and cookies
    }

    return (
        <FormattingContext.Provider
            value={{
                // Text Formatting
                fontSize,
                setFontSize,
                fontFamily,
                setFontFamily,
                fontWeight,
                setFontWeight,
                fontStyle,
                setFontStyle,
                textDecoration,
                setTextDecoration,

                // Line and Letter Spacing
                lineHeight,
                setLineHeight,
                letterSpacing,
                setLetterSpacing,

                // Background and Reading Aids
                backgroundColor,
                setBackgroundColor,
                readingRuler,
                setReadingRuler,
                rulerHeight,
                setRulerHeight,
                rulerColor,
                setRulerColor,
                readingMask,
                setReadingMask
            }}
        >
            {children}
        </FormattingContext.Provider>
    );
};

// Custom hook to use the formatting context
export const useFormatting = () => {
    const context = useContext(FormattingContext);
    if (context === undefined) {
        throw new Error('useFormatting must be used within a FormattingProvider');
    }
    return context;
};