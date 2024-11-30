"use client";

import { FormattingProvider } from '@/components/reading/formatting/UseFormatting';
import TextFormattingToolbar from '@/components/reading/ReadingTools';
import DocumentLayout from '@/components/reading/Document';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const fileName = searchParams.get("fileName");
    const [content, setContent] = useState<string>("");
    const [selectedText, setSelectedText] = useState<string>("");

    const handleSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
            const text = selection.toString();
            console.log("Selected text:", text);
            setSelectedText(text);
        }
    };

    
    useEffect(() => {
        if (fileName) {
            fetch(`/api/reading?fileName=${encodeURIComponent(fileName)}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to load file");
                    return res.text();
                })
                .then((data) => setContent(data))
                .catch((err) => {
                    console.error(err);
                    alert("Failed to load the file content");
                });
        }
    }, [fileName]);

    return (
        <FormattingProvider>
            <TextFormattingToolbar />
            <DocumentLayout>
                <div
                    className="prose"
                    onMouseUp={handleSelection}
                    onKeyUp={handleSelection}
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            </DocumentLayout>
        </FormattingProvider>
    );
}