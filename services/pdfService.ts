import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Initialize worker with the same version as the library
GlobalWorkerOptions.workerSrc = 'https://esm.sh/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs';

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = getDocument({
        data: arrayBuffer,
        cMapUrl: 'https://esm.sh/pdfjs-dist@4.0.379/cmaps/',
        cMapPacked: true,
    });
    
    const pdf = await loadingTask.promise;
    let fullText = '';

    // Iterate through all pages to extract text
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Join the text items with a space
        const pageText = textContent.items
            .filter((item: any) => item.str != null)
            .map((item: any) => item.str)
            .join(' ');
            
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
    }

    return fullText;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Could not parse PDF file. Please ensure it is a text-based PDF (not scanned images).");
  }
};