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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const validateToken = async () => {
            try {
                const req = await fetch("api/auth/token", {
                    method: "GET"
                });

                if (!req.ok) {
                    console.error("Invalid token");
                    return;
                }
    
                const usernameResponse = await fetch("api/auth/user", { method: "GET" });
                if (!usernameResponse.ok) {
                    console.error("Failed to retrieve username");
                    return;
                }
    
                const { username } = await usernameResponse.json();
                console.log("Username retrieved:", username);
                setIsLoggedIn(true);
                setUsername(username);


            } catch (error) {
                console.error("Failed to validate token:", error);
            }
        };

        validateToken();
    }, []);

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

    const handleSave = async () => {
        try {
            if (!username) {
                alert("No username found. Cannot save the document.");
                return;
            }

            if (!fileName) {
                alert("File name is missing");
                return;
            }
            const baseFileName = fileName.replace(/\.[^/.]+$/, "");
            const response = await fetch("/api/reading", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    document_name: baseFileName,
                    content: content
                }),
            });

            if (response.ok) {
                console.log("Document saved successfully");
                alert("Document saved successfully!");
            } else {
                const errorData = await response.json();
                console.error("Failed to save document:", errorData);
                alert(`Failed to save the document: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error saving document:", error);
            alert("An error occurred while saving the document");
        }
    };

    return (
        <FormattingProvider>
            <TextFormattingToolbar isLoggedIn={isLoggedIn} onSave={handleSave}/>
            <DocumentLayout>
                <div
                    className="prose"
                    onMouseUp={handleSelection}
                    onKeyUp={handleSelection}
                    //onInput={(e) => setContent(e.currentTarget.innerHTML)}
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            </DocumentLayout>
        </FormattingProvider>
    );
}