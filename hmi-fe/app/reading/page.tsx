"use client";
import { useFormatting } from '@/components/reading/formatting/UseFormatting';
import { FormattingProvider } from '@/components/reading/formatting/UseFormatting';
import TextFormattingToolbar from '@/components/reading/ReadingTools';
import DocumentLayout from '@/components/reading/Document';
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./page_css.css"
import Cookies from "js-cookie";
import { line } from 'framer-motion/client';



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
    const fileName = searchParams.get("fileName");
    const [filename, setFilename] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [selectedText, setSelectedText] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string>("");
    const documentName = searchParams.get("document_name");
    const { handleSelection, content, setContent } = useFormatting();

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

    useEffect(() => {
        if (documentName) {
            // Fetch the content of the file using the document_name
            fetch(`/api/library/getContent?document_name=${encodeURIComponent(documentName)}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to load file content");
                    return res.json();
                })
                .then((data) => {
                    setContent(data.content);
                    const fetchedSettings = data.settings;
                    
                    console.log("Fetched settings:", fetchedSettings);

                    Cookies.set(`fontSize`, fetchedSettings.fontSize);
                    Cookies.set(`fontFamily`, fetchedSettings.fontFamily);
                    Cookies.set(`fontWeight`, fetchedSettings.fontWeight);
                    Cookies.set(`fontStyle`, fetchedSettings.fontStyle);
                    Cookies.set(`textDecoration`, fetchedSettings.textDecoration);
                    Cookies.set(`lineHeight`, fetchedSettings.lineHeight);
                    Cookies.set(`letterSpacing`, fetchedSettings.letterSpacing);
                    Cookies.set(`backgroundColor`, fetchedSettings.backgroundColor);
                    Cookies.set(`readingRuler`, fetchedSettings.readingRuler);
                    Cookies.set(`rulerHeight`, fetchedSettings.rulerHeight);
                    Cookies.set(`rulerColor`, fetchedSettings.rulerColor);
                    Cookies.set(`readingMask`, fetchedSettings.readingMask);
                })
                .catch((err) => {
                    console.error("Failed to fetch file content:", err);
                    alert("Failed to load content");
                });
        }
    }, [documentName]);
    
    const handleSave = async () => {
        try {
            if (!username) {
                alert("No username found. Cannot save the document.");
                return;
            }

            var baseFileName = fileName ? fileName.replace(/\.[^/.]+$/, "") : documentName;

            const settings = {
                fontSize: Cookies.get(`fontSize`),
                fontFamily: Cookies.get(`fontFamily`),
                fontWeight: Cookies.get(`fontWeight`),
                fontStyle: Cookies.get(`fontStyle`),
                textDecoration: Cookies.get(`textDecoration`),
                lineHeight: Cookies.get(`lineHeight`),
                letterSpacing: Cookies.get(`letterSpacing`),
                backgroundColor: Cookies.get(`backgroundColor`),
                readingRuler: Cookies.get(`readingRuler`),
                rulerHeight: Cookies.get(`rulerHeight`),
                rulerColor: Cookies.get(`rulerColor`),
                readingMask: Cookies.get(`readingMask`),
            };
    
            // Ensure settings is not empty
            console.log("Settings to be saved:", settings);
    
            const response = await fetch("/api/reading", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    document_name: baseFileName,
                    content: content,
                    settings: settings, // Ensure settings is included
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