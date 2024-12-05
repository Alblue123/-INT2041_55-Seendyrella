"use client";
import { useFormatting } from '@/components/reading/formatting/UseFormatting';
import { FormattingProvider } from '@/components/reading/formatting/UseFormatting';
import TextFormattingToolbar from '@/components/reading/ReadingTools';
import DocumentLayout from '@/components/reading/Document';
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./page_css.css"

export default function Page() {
    const searchParams = useSearchParams();
    const fileName = searchParams.get("fileName");

    return (
        <FormattingProvider>
            <PageContent fileName={fileName} />
        </FormattingProvider>
    );
}

interface PageContentProps {
    fileName: string | null;
}

function PageContent({ fileName }: PageContentProps) {
    const { handleSelection, content, setContent } = useFormatting();
    
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
    }, [fileName, setContent]);

    return (
        <>
            <TextFormattingToolbar />
            <DocumentLayout>
                <div
                    className="prose"
                    contentEditable
                    suppressContentEditableWarning
                    onMouseUp={handleSelection}
                    onKeyUp={handleSelection}
                    onInput={(e) => setContent(e.currentTarget.innerHTML)}
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            </DocumentLayout>
        </>
    );
}