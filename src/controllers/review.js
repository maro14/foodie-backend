const Review = require('../models/review');
const Item = require('../models/item');
const User = require('../models/user');

const CreateReview = async(req, res) => {

  try {
    const { itemid } = req.params
    const { rating, comment } = req.body

    const item = await Item.findById(itemid)
    if (!item) {
      res.status(404).json({ message: 'Item not found'})
    }

    const reivew = await Review.create({
      user: req.user._id,
      item: itemid,
      rating,
      comment
    })

    res.status(201).json({ data: reivew })
  } catch (err) {
    req.status(500).json({ message: err.message })
  }
}

module.exports = { CreateReview }
