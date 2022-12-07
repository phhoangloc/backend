
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({ // config mail server
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        // user: 'ph.hoangloc.emailtest@gmail.com', //Tài khoản gmail vừa tạo
        user: 'h-loc@astem-co.co.jp', //Tài khoản gmail vừa tạo
        pass: '03101990' //Mật khẩu tài khoản gmail vừa tạo
    },
});

module.exports = transporter