const nodemailer = require('nodemailer');

const createTrans = () => {

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "e436ec383356f2",
        pass: "6d038a330ce727"
        }
    });

    return transport;

}

const sendMail = async () => {

    const transporter = createTrans()
    
    const info  = await transporter.sendMail({

        from: '"FRE"', //quien lo envia
        to: "bar@example.com", //["",""] lista o a quien va a ser enviado
        subject: "hello", //Asunto
        html: "<b>BYE</b>" //


    });

    console.log("Message send:",info.messageId);

    return

}

exports.sendMail = () => sendMail();