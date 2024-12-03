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
    lineHeight: number;
    setLineHeight: (height: number) => void;
    letterSpacing: number;
    setLetterSpacing: (spacing: number) => void;
    handleSelection: () => void;
    content: string;
    setContent: (content: string) => void;
    highlight: string;
    setHighlight: (highlight: string) => void;
}

// Create the context
const FormattingContext = createContext<FormattingContextType | undefined>(undefined);

// Provider component
export const FormattingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [fontSize, setFontSize] = useState<string>("14");
    const [fontFamily, setFontFamily] = useState<string>("Arial");
    const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>('normal');
    const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
    const [textDecoration, setTextDecoration] = useState<'none' | 'underline'>('none');
    const [lineHeight, setLineHeight] = useState<number>(1.5);
    const [letterSpacing, setLetterSpacing] = useState<number>(0);
    const [content, setContent] = useState<string>(""); 
    const [highlight, setHighlight] = useState<string>("");

    const handleSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
            const text = selection.toString();
            const updatedContent = content.replace(
                text,
                `<span style="background-color:${highlight || 'yellow'}"
                                font-ưeight:${fontWeight}
                >${text}</span>`
            );
            setContent(updatedContent);
        }
    };

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
                lineHeight,
                setLineHeight,
                letterSpacing,
                setLetterSpacing,
                content,
                setContent,
                handleSelection,
                highlight,
                setHighlight,
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