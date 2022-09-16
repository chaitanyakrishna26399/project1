const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

function otp (tomail, fourDigitOTP) {

    const msg = {
        "to": tomail,
        "from": "hello@farcostore.com",
        "subject": 'assignment  otp',
        "text": `your one time otp is ${fourDigitOTP}`,
    }
    return sgMail.send(msg).then(data => {
        return true
    }).catch(err => {
        return false
    })
}


module.exports ={otp}