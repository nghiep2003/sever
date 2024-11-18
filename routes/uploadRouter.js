var express = require("express");
var router = express.Router();
const Uploads = require("../config/upload");
/* GET users listing. */
router.post("/test", function (req, res, next) {
  res.send("respond with a resource a user test");
});

router.post('/mulUpload', Uploads.array('images', 5), async(req, res) =>{
try {
    const {files}= req
    const urlImage = files.map((file) => `${req.protocol}://${req.get('host')}/ uploads/${file.filename}`)
    console.log(urlImage)
} catch (error) {
    console.log(error)
}
}
)

module.exports = router;