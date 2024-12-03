import React from 'react';
import { Button, Tooltip } from "@nextui-org/react";
import { Save } from "lucide-react";

interface SaveDocumentProps {
    onSave?: () => void;
    className?: string;
}

const SaveDocument: React.FC<SaveDocumentProps> = ({ onSave, className }) => {
    const handleSave = () => {
        if (onSave) {
            onSave();
        } else {
            console.log('Saving document...');
        }
    };

    return (
        <Tooltip
            content="Saving this document"
            placement='bottom'
        >
            <Button
                isIconOnly
                variant="light"
                aria-label="Save document"
                onClick={handleSave}
                className={`${className}`}
            >
                <Save className="h-5 w-5" />
            </Button>
        </Tooltip>
    );
};

export default SaveDocument;