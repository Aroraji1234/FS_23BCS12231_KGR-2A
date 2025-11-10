package com.project.certificate_genrator.service;

import com.lowagie.text.DocumentException;
import org.springframework.stereotype.Service;
import org.xhtmlrenderer.pdf.ITextRenderer;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class CertificateService {

    /**
     * Converts a string of HTML content into a PDF byte array.
     */
    public byte[] generatePdfFromHtml(String htmlContent) throws DocumentException, IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ITextRenderer renderer = new ITextRenderer();

        // Resolve relative paths for resources like images
        renderer.getSharedContext().setBaseURL("file:/"); 

        renderer.setDocumentFromString(htmlContent);
        renderer.layout();
        renderer.createPDF(outputStream);

        outputStream.close();
        return outputStream.toByteArray();
    }
}
