var express = require('express');
var router = express.Router();
const email = require('../config/mail')
const Transporter = require('../config/mail')
/* GET users listing. */
router.post('/test', function (req, res, next) {
    const mailOption={
        from:'vocongnghiep03@gmail.com',
        to:'nghiepvcpd07673@fpt.edu.vn',
        subject:'test mail',
        text:'this is a test email send nodejs project'
    }
    Transporter.sendMail(mailOption,function(error,info){
        if(error){
            res.status(500).json({error:"Send email fail "+error})

        }else{
            res.status(200).json({error:"Send email success"+info.response})
        }
    })
});



module.exports = router;