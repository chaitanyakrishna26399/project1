let jwt = require('jsonwebtoken')
//require secret key and duration time from env file.
var secretKey = 'acsujayugcbjdsljjso54sxASllkjd'


// created a function for jwt process.
class JWT {

    /**
     * @description create jwt token and refresh token.
     */

    static async createToken(inputData) {
        try {

            // access token creates here.
            let accessToken = jwt.sign(inputData, secretKey,{ expiresIn:"60s" });
             

            if (!accessToken) {
                // condition fails to generate a token.
                return false;
            } else {
                // condition success genreates a token.
                return {
                    accessToken: accessToken, // accessToken less duration.
    
                }
            }

        } catch (error) {
            // server error goes here.
            res.status(200).json({
                status: false,
                message: error.message
            })
        }
    }

    /**
     * @description verify jwt token.
     */

    static async verifyToken(req, res, next) {
        try {

            //input headers data.
            let inputToken = req.headers.authorization;
            if (inputToken != undefined) {
                //verify token.
                var token=inputToken.split(' ')[1]
                let verifyToken = jwt.verify(token, secretKey, (error, result) => {
                    if (error) {
                        // session expired.
                        res.status(401).json({
                            status: false,
                            message: `Session timed out.`
                        })
                    } else {
                        req.user_id=result.user_id
                        // successfully verified.
                        next(); // goes to next method
                    }
                })
            }else{
                //no access token provided case.
                res.status(400).json({
                    status : false,
                    message : `Permissions required. access token missing.`
                })
            }

        } catch (error) {
            // server error goes here.
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }



}

module.exports = JWT
