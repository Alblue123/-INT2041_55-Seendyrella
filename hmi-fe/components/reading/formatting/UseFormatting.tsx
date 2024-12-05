import React, {
    createContext,
    useState,
    useContext,
    ReactNode
} from 'react';

export type FontWeight = 'normal' | 'bold';
export type FontStyle = 'normal' | 'italic';
export type TextDecoration = 'none' | 'underline';

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
    handleSelection: () => void;
    content: string;
    setContent: (content: string) => void;
    highlight: string;
    setHighlight: (highlight: string) => void;
    // removeHighlight: (element: HTMLElement) => void;


    // Background and Reading Aids
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
    readingRuler: boolean;
    setReadingRuler: (enabled: boolean) => void;
    rulerHeight: number;
    setRulerHeight: (height: number) => void;
    rulerColor: string;
    setRulerColor: (color: string) => void;
    rulerPosition: number;
    setRulerPosition: (position: number) => void;


    readingMask: boolean;
    setReadingMask: (enabled: boolean) => void;
}

const FormattingContext = createContext<FormattingContextType | undefined>(undefined);

export const FormattingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [fontSize, setFontSize] = useState<number>(16);
    const [fontFamily, setFontFamily] = useState<string>("Inter");
    const [fontWeight, setFontWeight] = useState<FontWeight>('normal');
    const [fontStyle, setFontStyle] = useState<FontStyle>('normal');
    const [textDecoration, setTextDecoration] = useState<TextDecoration>('none');
    const [lineHeight, setLineHeight] = useState<number>(1.5);
    const [letterSpacing, setLetterSpacing] = useState<number>(0);
    const [backgroundColor, setBackgroundColor] = useState<string>("#F4F4F5");
    const [readingRuler, setReadingRuler] = useState<boolean>(false);
    const [rulerHeight, setRulerHeight] = useState<number>(2);
    const [rulerColor, setRulerColor] = useState<string>('#6B7280');
    const [rulerPosition, setRulerPosition] = useState<number>(50);
    const [readingMask, setReadingMask] = useState<boolean>(false);
    const [content, setContent] = useState<string>(""); 
    const [highlight, setHighlight] = useState<string>("");
  

    const handleSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
            const text = selection.toString();
            const updatedContent = content.replace(
                text,
                `<span 
                    highlight="true" 
                    style="background-color:${highlight|| 'transparent'};
                    font-weight:${fontWeight}"
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
                backgroundColor,
                setBackgroundColor,
                readingRuler,
                setReadingRuler,
                rulerHeight,
                setRulerHeight,
                rulerColor,
                setRulerColor,
                readingMask,
                setReadingMask,
                rulerPosition,
                setRulerPosition,
            }}
        >
            {children}
        </FormattingContext.Provider>
    );
};

export const useFormatting = () => {
    const context = useContext(FormattingContext);
    if (context === undefined) {
        throw new Error('useFormatting must be used within a FormattingProvider');
    }
    return context;
};