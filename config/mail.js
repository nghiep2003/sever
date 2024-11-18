const nodeMailer =  require('nodemailer')
const transporter = nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:"vocongnghiep03@gmail.com",
        pass:"vuwr skje lzkx sxdt"
    }
})
module.exports = transporter