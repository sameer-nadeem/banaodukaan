const multer = require('multer')
const path = require("path")

const Storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage: Storage,
  limits: { fileSize: 1000000 },
}).single('myImage')

const uploadProductImage = (req, res) => {
  upload(req, res, (err) => {
    console.log(req.file.path)
    res.send(`/${req.file.path}`)
  })
}
const uploadCollectionImage = (req, res) => {
  upload(req, res, (err) => {
    console.log(req.file.path)
    res.send(`/${req.file.path}`)
  })
}
const uploadStoreImage = (req, res) => {
  upload(req, res, (err) => {
    console.log(req.file.path)
    res.send(`/${req.file.path}`)
  })
}
module.exports = {
  uploadProductImage,
  uploadCollectionImage,
  uploadStoreImage
}
