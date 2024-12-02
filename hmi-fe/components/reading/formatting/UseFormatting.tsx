import React, {
    createContext,
    useState,
    useContext,
    ReactNode
} from 'react';

// Types for formatting options
export type FontWeight = 'normal' | 'bold';
export type FontStyle = 'normal' | 'italic';
export type TextDecoration = 'none' | 'underline';

// Define the shape of our formatting context
interface FormattingContextType {
    // Text Formatting
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

    // Line and Letter Spacing
    lineHeight: number;
    setLineHeight: (height: number) => void;
    letterSpacing: number;
    setLetterSpacing: (spacing: number) => void;

    // Background and Reading Aids
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
    readingRuler: boolean;
    setReadingRuler: (enabled: boolean) => void;
    readingMask: boolean;
    setReadingMask: (enabled: boolean) => void;
}

// Create the context
const FormattingContext = createContext<FormattingContextType | undefined>(undefined);

// Provider component
export const FormattingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Default states
    const [fontSize, setFontSize] = useState<number>(16);
    const [fontFamily, setFontFamily] = useState<string>("Inter");
    const [fontWeight, setFontWeight] = useState<FontWeight>('normal');
    const [fontStyle, setFontStyle] = useState<FontStyle>('normal');
    const [textDecoration, setTextDecoration] = useState<TextDecoration>('none');
    const [lineHeight, setLineHeight] = useState<number>(1.5);
    const [letterSpacing, setLetterSpacing] = useState<number>(0);
    const [backgroundColor, setBackgroundColor] = useState<string>("#F4F4F5");
    const [readingRuler, setReadingRuler] = useState<boolean>(false);
    const [readingMask, setReadingMask] = useState<boolean>(false);

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