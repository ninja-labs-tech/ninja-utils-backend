const express = require('express');
const pdfServicesRouter = require('./routes/pdf-services');

const app = express();

app.use(express.json());
app.use('/services/pdf', pdfServicesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server starts at http://localhost:${port}`));