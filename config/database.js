const Pool=require('pg').Pool
const pool= new Pool({
    user:"wtasdxqyqeyxpx",
    host:"ec2-54-91-223-99.compute-1.amazonaws.com",
    database:"ddh5vh0192bi9h",
    password:"ef3fca058e0971dec8b5a6b2796cc9e3cd965e4b4a26579f9a6eb77e11cdad84",
    port:"5432",
    ssl: {
        rejectUnauthorized: false,
    }
})

module.exports=pool