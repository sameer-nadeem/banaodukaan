const multer = require('multer')
const path = require("path")

const Storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
})

const Storage2 = multer.diskStorage({
  destination: "./uploads/images/new",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
})

const upload = multer({
  storage: Storage,
  limits: { fileSize: 100000000000000 },
}).single('myImage')

const uploadMultiple = multer({
  storage: Storage2,
  limits: { fileSize: 100000000000000 },
}).array('myImage', 10)

const uploadProductImage = (req, res) => {
  uploadMultiple(req, res, (err) => {
    // console.log(req.files)
    var pathArray = []
    req.files.forEach(file =>{
      pathArray.push(`/${file.path}`)
    })
    res.send(pathArray)
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
