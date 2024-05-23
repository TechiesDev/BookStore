const express = require('express');
const router = express.Router();
const {uploadSliderImage} = require('../controllers/SliderController');
const upload = require('../utils/Multer');


router.post('/uploads', upload.single('img'), uploadSliderImage);


module.exports = router;
