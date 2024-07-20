document.getElementById('downloadPdf').addEventListener('click', function() {
    const cvElement = document.getElementById('cv');
    const scale = 2; // Aumenta la escala para mejorar la resolución

    html2canvas(cvElement, { scale: scale }).then(canvas => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // Ancho de A4 en mm
        const pageHeight = 295; // Altura de A4 en mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('CV_Carlos_Alarcon.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
    });
});
