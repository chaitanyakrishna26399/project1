let base64 = require('../config/base64Encryption')
var pool = require('../config/database')
let sendgrid = require('../config/sendGrid')
const jwt = require('../config/jwt')
// created a class name userModule for multiple functions.
class userModule {
    static async verifyEmail(req, res) {
        try {
            let inputData = req.body;

            await pool.query(`SELECT * FROM user_details where email = $1 `, [inputData.email], async (error, results) => {
                if (error) {
                    // query error goes here.
                    res.status(200).json({
                        status: false,
                        message: error.message
                    })
                } else {
                    // query results goes here.
                    if (results.rowCount >= 1) {
                        res.status(400).json({
                            status: false,
                            message: `email already exists.`
                        })
                    } else {
                        // generates four digit OTP.
                        var fourDigitOTP = Math.floor(Math.random() * (9999 - 1111) + 1111);
                        console.log(inputData.email, fourDigitOTP)
                        let mailStatus = await sendgrid.otp(inputData.email, fourDigitOTP)
                        if (mailStatus) {
                            // sms sent succesfully.
                            await pool.query(`INSERT INTO user_details (email,otp) VALUES ($1,$2) `, [inputData.email, fourDigitOTP], (error, results) => {
                                if (error) {
                                    // query error goes here.
                                    res.status(200).json({
                                        status: false,
                                        message: error.message
                                    })
                                } else {
                                    // query response goes here.
                                    if (results.rowCount >= 1) {
                                        res.status(200).json({
                                            status: true,
                                            otp:fourDigitOTP,
                                            message: `OTP sent successfully.`
                                        })
                                    } else {
                                        res.status(200).json({
                                            status: false,
                                            message: `Some thing went wrong.`
                                        })
                                    }
                                }
                            })
                        } else {
                            // sms sent failed.
                            res.status(200).json({
                                status: false,
                                message: `Unable to send otp. at this moment please try after some time.`
                            })
                        }
                    }
                }
            })

        } catch (error) {
            // server error goes here.
            res.status(200).json({
                status: false,
                message: error.message
            })
        }
    }
    static async userSignup(req, res) {
        try {
            // let inputData.
            let inputData = req.body;
            let otp = req.body.otp

            let encodedPassword = await base64.base64Encode(inputData.password);

            await pool.query(`SELECT * FROM user_details WHERE email = $1`, [inputData.email], async (error, results) => {
                if (error) {
                    res.status(200).json({
                        status: false,
                        message: error.message
                    })
                } else {
                    if (results.rowCount >= 1) {
                        if (parseInt(results.rows[0].otp) === parseInt(otp)) {
                            await pool.query(`UPDATE user_details SET user_name=$1,user_password=$2 where email=$3`, [inputData.name, encodedPassword, inputData.email], async (error, results) => {
                                if (error) {
                                    //  query error goes here.
                                    res.status(200).json({
                                        status: false,
                                        message: error.message
                                    })
                                } else {
                                    //  query response goes here.
                                    if (results.rowCount >= 1) {
                                        res.status(200).json({
                                            status: true,
                                            data:results.rows[0],
                                            message: `Register successfully.`
                                        })
                                    } else {
                                        res.status(200).json({
                                            status: true,
                                            message: `Unable to register your details.`
                                        })
                                    }
                                }
                            })
                        } else {
                            res.status(400).json({
                                status: false,
                                message: `Incorrect OTP.`
                            })
                        }
                    }
                }
            })

        } catch (error) {
            // server error goes here.
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }


    static async userLogin(req, res) {
        try {
            let inputData = req.body;
            await pool.query(`SELECT * FROM user_details WHERE email = $1`, [inputData.email], async (error, results) => {
                if (error) {
                    // query error goes here.
                    res.status(200).json({
                        status: false,
                        message: error.message
                    })
                } else {
                    // query results goes here.
                    if (results.rowCount >= 1) {
                        let decodePassword = await base64.base64Decode(results.rows[0].user_password);
                        if (decodePassword === inputData.password) {
                            let accessToken = await jwt.createToken({ email: inputData.email })
                            res.status(200).json({
                                status: true,
                                result: accessToken,
                                data:results.rows[0],
                                message: `Login successfully`
                            })
                        } else {
                            res.status(200).json({
                                status: false,
                                message: `Incorrect password.`
                            })
                        }
                    } else {
                        // no users found.
                        res.status(200).json({
                            status: false,
                            message: `Invalid user login.`
                        })
                    }
                }
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    static async user_task(req, res) {
        try {
            let inputData = req.body
            await pool.query(`insert into user_task (user_id,task_date,task,status) values($1,$2,$3,$4)`,
                [inputData.user_id, inputData.date, inputData.task, inputData.status], (error, results) => {
                    if (error) {
                        // query error goes here.
                        res.status(200).json({
                            status: false,
                            message: error.message
                        })
                    } else {
                        // query response goes here.
                        if (results.rowCount >= 1) {
                            res.status(200).json({
                                status: true,
                                data:results.rows[0],
                                message: `task added successfully.`
                            })
                        } else {
                            res.status(200).json({
                                status: false,
                                message: `Some thing went wrong.`
                            })
                        }
                    }
                })

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }
    static async updateTask(req, res) {
        try {
            let inputData = req.body;
            let queryFilter = [];
            let valueFilter = [];
            if (inputData.date != undefined) {
                valueFilter.push(inputData.date)
                queryFilter.push(`date = $${parseInt(valueFilter.indexOf(inputData.date)) + 1}`)
            }

            if (inputData.task != undefined) {
                valueFilter.push(inputData.task)
                queryFilter.push(`task = $${parseInt(valueFilter.indexOf(inputData.task)) + 1}`)
            } if (inputData.status != undefined) {
                valueFilter.push(inputData.status)
                queryFilter.push(`status = $${parseInt(valueFilter.indexOf(inputData.status)) + 1}`)
            }
            //query for update
            // console.log(`update user_task set ${queryFilter} where task_id=${inputData.id}`, valueFilter)
            await pool.query(`update user_task set ${queryFilter} where task_id=${inputData.task_id}`, valueFilter, async (error, results) => {
                if (error) {
                    // query error goes here.
                    res.status(200).json({
                        status: false,
                        message: error.message
                    })
                }else {
                    // query response goes here.
                    if (results.rowCount >= 1) {
                        res.status(200).json({
                            status: true,
                            data:results.rows[0],
                            message: `task updated successfully.`
                        })
                    } else {
                        res.status(200).json({
                            status: false,
                            message: `Some thing went wrong.`
                        })
                    }
                }
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }
    
    static async deleteTask(req,res){
        try{
            //input data
            let inputData=req.body
            await pool.query(`delete from user_task where task_id=${inputData.task_id}`,(error,results)=>{
                if (error) {
                    // query error goes here.
                    res.status(200).json({
                        status: false,
                        message: error.message
                    })
                }else {
                    // query response goes here.
                    if (results.rowCount >= 1) {
                        res.status(200).json({
                            status: true,
                            message: `task deleted successfully.`
                        })
                    } else {
                        res.status(200).json({
                            status: false,
                            message: `Some thing went wrong.`
                        })
                    }
                }
            })
            

        }catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }


}
module.exports = userModule
