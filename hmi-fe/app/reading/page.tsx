"use client";

import DocumentLayout from "@/components/reading/Document";
import ReadingTools from "@/components/reading/tools/ReadingTools";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Reading() {
    const searchParams = useSearchParams();
    const fileName = searchParams.get("fileName");
    const [content, setContent] = useState<string>("");

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
        <div>
            <ReadingTools />
            <DocumentLayout>
                {/* Inject the content dynamically */}
                <div
                    dangerouslySetInnerHTML={{ __html: content }}
                    
                />
            </DocumentLayout>
        </div>
    );
}