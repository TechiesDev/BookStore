const Slider = require('../model/SliderModel');


const uploadSliderImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: res.__('imageupload.error2') });
    }
    const slider = new Slider({
      img: req.file.path
    });

    await slider.save();
    res.status(201).json({ message: res.__('imageupload.message1') });
  } catch (err) {
    res.status(500).json({ message: res.__('imageupload.error1'), error:err.message });
  }
};

module.exports = { uploadSliderImage }