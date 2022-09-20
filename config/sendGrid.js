const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

function otp (tomail, fourDigitOTP) {

    const msg = {
        "to": tomail,
        "from": "chaituchowdary040@gmail.com",
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
