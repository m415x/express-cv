import jsPDF from "jspdf";

export function exporter(contentElement) {
    const doc = new jsPDF();

    // Obtener el contenido de la vista previa
    const content = contentElement.innerHTML;

    // Aquí puedes agregar lógica para formatear el contenido en el PDF
    doc.text(10, 10, content);

    // Descargar el archivo PDF
    doc.save("cv.pdf");
}
