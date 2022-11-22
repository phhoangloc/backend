
const nodemailer=require('nodemailer')

const  transporter =  nodemailer.createTransport({ // config mail server
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ph.hoangloc.emailtest@gmail.com', //Tài khoản gmail vừa tạo
        pass: 'sgegrlqmsvghmjih' //Mật khẩu tài khoản gmail vừa tạo
    },
});

module.exports=transporter