// require joi module.
const joi = require('joi')
// creates a class for admin validations
class userValidations {
    static async verifyMobile(req, res, next) {

        // validate the input body value. 
        const validation = joi.object({
            email: joi.string().required().email().label('Email'),
        })

        //  below options are used to remove the qoutes in the validation response.
        const options = {
            errors: {
                wrap: {
                    label: ''
                }
            }
        };


        const err = validation.validate(req.body, options);
        if (err.error) {
            //return error message.
            res.status(200).json({
                status: false,
                message: err.error.details[0].message
            });
        } else {
            //moves to next method.
            next();
        }
    }
    static async signup(req, res, next) {
        // validate the input body value. 
        const validation = joi.object({
            name: joi.string().required().label('Name'),
            email: joi.string().required().email().label('Email'),
            password: joi.string().required().label('Password'),
            otp: joi.number().integer().required(),
        })
        //  below options are used to remove the qoutes in the validation response.
        const options = {
            errors: {
                wrap: {
                    label: ''
                }
            }
        };


        const err = validation.validate(req.body, options);
        if (err.error) {
            //return error message.
            res.status(200).json({
                status: false,
                message: err.error.details[0].message
            });
        } else {
            //moves to next method.
            next();
        }
    }
    static async login(req, res, next) {
        // validate the input body value. 
        const validation = joi.object({
            email: joi.string().required().email().label('Email'),
            password: joi.string().required().label('Password')
        })



        //  below options are used to remove the qoutes in the validation response.
        const options = {
            errors: {
                wrap: {
                    label: ''
                }
            }
        };


        const err = validation.validate(req.body, options);
        if (err.error) {
            //return error message.
            res.status(200).json({
                status: false,
                message: err.error.details[0].message
            });
        } else {
            //moves to next method.
            next();
        }
    }
    static async addTask(req, res, next) {
        // validate the input body value. 
        const validation = joi.object({
            user_id: joi.number().integer().required(),
            date:joi.date().required(),
            task: joi.string().required(),
            status : joi.string().valid('completed','incompleted').required()
        })



        //  below options are used to remove the qoutes in the validation response.
        const options = {
            errors: {
                wrap: {
                    label: ''
                }
            }
        };


        const err = validation.validate(req.body, options);
        if (err.error) {
            //return error message.
            res.status(200).json({
                status: false,
                message: err.error.details[0].message
            });
        } else {
            //moves to next method.
            next();
        }
    }
    static async deleteTask(req, res, next) {
        // validate the input body value. 
        const validation = joi.object({
            task_id: joi.string().required()
        })



        //  below options are used to remove the qoutes in the validation response.
        const options = {
            errors: {
                wrap: {
                    label: ''
                }
            }
        };


        const err = validation.validate(req.body, options);
        if (err.error) {
            //return error message.
            res.status(200).json({
                status: false,
                message: err.error.details[0].message
            });
        } else {
            //moves to next method.
            next();
        }
    }
    static async updateTask(req, res, next) {
        // validate the input body value. 
        const validation = joi.object({
            task_id: joi.string().required(),
            task_date:joi.date(),
            task: joi.string(),
            status : joi.string().valid('completed','incompleted')
        })



        //  below options are used to remove the qoutes in the validation response.
        const options = {
            errors: {
                wrap: {
                    label: ''
                }
            }
        };


        const err = validation.validate(req.body, options);
        if (err.error) {
            //return error message.
            res.status(200).json({
                status: false,
                message: err.error.details[0].message
            });
        } else {
            //moves to next method.
            next();
        }
    }
    static async getUserTask(req, res, next) {
        // validate the input body value. 
        const validation = joi.object({
            user_id: joi.number().integer().required()
        })



        //  below options are used to remove the qoutes in the validation response.
        const options = {
            errors: {
                wrap: {
                    label: ''
                }
            }
        };


        const err = validation.validate(req.body, options);
        if (err.error) {
            //return error message.
            res.status(200).json({
                status: false,
                message: err.error.details[0].message
            });
        } else {
            //moves to next method.
            next();
        }
    }
}

// export all methods in the class
module.exports = userValidations
