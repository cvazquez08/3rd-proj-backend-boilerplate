const express = require("express");
const router = express.Router();

const Phone = require("../models/phone-model");

// save new phone to DB
router.post("/phones", (req, res, next) => {
  const { brand, model, price, image, specs } = req.body;

  if(brand == '' || model == '' || specs == '' || price == '' || image == ''){
    // send error JSON if any of the fields is empty or password doesn't contain a number
    res.status(401).json({ message: "All fields need to be entered" })
    return;
  }

  Phone.create({ brand, model, price, image, specs })
    .then(phoneDoc => {
      res.json(phoneDoc);
    })
    .catch(err => next(err));
});

// Display phones 
router.get('/phones', (req,res,next) => {
  Phone.find()
  .sort({createdAt: -1})
  .limit(10)
  // send results from DB as JSON to frontend
  .then( phonesFromDB => res.json(phonesFromDB))
  .catch( error => next(error))
})
module.exports = router;
