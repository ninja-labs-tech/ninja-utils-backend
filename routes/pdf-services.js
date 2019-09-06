const express = require('express');
const fileType = require('file-type');
const verifyPDF = require('@ninja-labs/verify-pdf');
const validateVerifyPdfRequest = require('../helpers/validateVerifyPdfRequest');

const router = express.Router();

router.post('/verify-pdf', async (req, res) => {
  const { error } = validateVerifyPdfRequest(req.body);
  if (error) return res
    .status(400)
    .send({
      message: 'Invalid request body'
    });

  const buffer = Buffer.from(req.body.file, 'base64');
  const { ext } = fileType(buffer) || {};
  if (!ext || ext !== 'pdf') return res
    .status(400)
    .send({
      message: 'File is not pdf'
    });

  const sizeLimit = process.env.PDF_SIZE || 10**7;
  if (buffer.length > sizeLimit) return res
    .status(400)
    .send({
      message: 'Pdf file size should not exceed 10 MB'
    });
  
  const result = verifyPDF(buffer);

  res.send(result);
});

module.exports = router;