declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: number;
      filename?: string;
      image?: { type: string; quality: number };
      html2canvas?: { scale: number; useCORS?: boolean };
      jsPDF?: { unit: string; format: string; orientation: string };
    }
  
    function html2pdf(): {
      from(element: HTMLElement): {
        set(options: Html2PdfOptions): this;
        save(): Promise<void>;
      };
    }
  
    export default html2pdf;
  }
  