import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

// Function to generate PDF
const generatePDF = async (content: string, settings: any) => {
    const browser = await puppeteer.launch({
        headless: true, // Ensure it's in headless mode for server environments
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // For environments like Docker or certain cloud providers
    });
    const page = await browser.newPage();

    const styles = `
        <style>
            body {
                font-size: ${settings.fontSize || '16px'};
                line-height: ${settings.lineHeight || '1.5'};
                font-family: ${settings.fontFamily || 'Inter'};
                font-weight: ${settings.fontWeight || 'normal'};
                font-style: ${settings.fontStyle || 'normal'};
                text-decoration: ${settings.textDecoration || 'none'};
                letter-spacing: ${settings.letterSpacing || '0px'};
                background-color: ${settings.backgroundColor || '#FFFFFF'};
            }
        </style>
    `;

    // Set the HTML content with styles
    await page.setContent(styles + content);
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();

    return pdfBuffer;
};

// Named export for the POST method
export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received payload:", body);

        const { content, settings, document_name } = body;

        if (!content || !settings || !document_name) {
            console.error("Missing required fields:", { content, settings, document_name });
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const pdfBuffer = await generatePDF(content, settings);
        console.log("Generated PDF Buffer successfully.");

        return new Response(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${document_name}.pdf`,
            },
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
