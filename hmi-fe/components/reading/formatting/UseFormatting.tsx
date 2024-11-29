import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our formatting context
interface FormattingContextType {
    fontSize: string;
    setFontSize: (size: string) => void;
    fontFamily: string;
    setFontFamily: (family: string) => void;
    fontWeight: 'normal' | 'bold';
    setFontWeight: (weight: 'normal' | 'bold') => void;
    fontStyle: 'normal' | 'italic';
    setFontStyle: (style: 'normal' | 'italic') => void;
    textDecoration: 'none' | 'underline';
    setTextDecoration: (decoration: 'none' | 'underline') => void;
    highlightColor: string;
    setHighlightColor: (color: string) => void;
    isHighlighting: boolean;
    setIsHighlighting: (isHighlighting: boolean) => void;
}

// Create the context
const FormattingContext = createContext<FormattingContextType | undefined>(undefined);

// Provider component
export const FormattingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [fontSize, setFontSize] = useState<string>("14");
    const [fontFamily, setFontFamily] = useState<string>("Calibri (body)");
    const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>('normal');
    const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
    const [textDecoration, setTextDecoration] = useState<'none' | 'underline'>('none');
    const [highlightColor, setHighlightColor] = useState<string>("yellow");
    const [isHighlighting, setIsHighlighting] = useState<boolean>(false);

    return (
        <FormattingContext.Provider
            value={{
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
                highlightColor,
                setHighlightColor,
                isHighlighting,
                setIsHighlighting
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