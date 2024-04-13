import express from 'express';

const app = express();

app.use(express.static('public')); // We want to read HTML from public folder

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


// basic routes:
app.get('/users', async (req, res) => {
    let get_res = await fetch('https://jsonplaceholder.typicode.com/users');
    let user_list = await get_res.json();

    res.send(`
        <h1 class="text-2xl font-bold my-4"></h1>
        <ul>
            ${user_list.map((user) => `<li>${user.name}</li>`).join('')}
        </ul>
        `);
});
app.get('/usersLoader', async (req, res) => {
    setTimeout(async () => {
        let get_res = await fetch('https://jsonplaceholder.typicode.com/users');
        let user_list = await get_res.json();

        res.send(`
        <h1 class="text-2xl font-bold my-4"></h1>
        <ul>
            ${user_list.map((user) => `<li>${user.name}</li>`).join('')}
        </ul>
        `);
    }, 1000);

});

app.post('/mergeSignature', async (req, res) => {
    const { documentData, signatureData } = req.body;

    // Convert document data from base64 to binary
    const documentBuffer = Buffer.from(documentData.split(';base64,').pop(), 'base64');

    // Load PDF document
    const pdfDoc = await PDFDocument.load(documentBuffer);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Convert signature data from base64 to binary
    const signatureBuffer = Buffer.from(signatureData.split(';base64,').pop(), 'base64');

    // Embed signature image onto the PDF
    const signatureImage = await pdfDoc.embedPng(signatureBuffer);
    const { width, height } = signatureImage.scale(0.5); // Adjust scale as needed
    const signatureDims = { width, height };

    // Get position to place the signature
    const posX = 100; // Adjust position as needed
    const posY = 100; // Adjust position as needed

    firstPage.drawImage(signatureImage, {
        x: posX,
        y: posY,
        width: signatureDims.width,
        height: signatureDims.height,
        opacity: 0.8,
    });

    // Save modified PDF to a buffer
    const modifiedPdfBytes = await pdfDoc.save();

    // Respond with the modified PDF as a data URL
    const modifiedPdfDataUrl = `data:application/pdf;base64,${modifiedPdfBytes.toString('base64')}`;
    res.send(modifiedPdfDataUrl);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})