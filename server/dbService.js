const mysql = require('mysql')
const dotenv = require('dotenv')
let instance = null
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

connection.connect((err) => {
    if(err){
        console.log(err.message)
    }else{
        console.log('db ' + connection.state)
    }
})

class DbService{
    static getDbServiceInstance(){
        return instance? instance : new DbService()
    }

    async getAllData(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM registration;'
                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err.message))
                    resolve(results)
                })
            })

            console.log(response)
        return response
        } catch(err){
            console.log(err)
        }
    }

    async insertNewData(fn, ln, cn, dn, eves){
        try{
            const date = new Date()
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO registration (Date,`First Name`,`Last Name`,College,Department,Events) VALUES (?,?,?,?,?,?);";
                connection.query(query, [date, fn, ln, cn, dn, eves], 
                    (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.insertId)
                })
            })

            console.log(insertId)
        // return response
        } catch(err){
            console.log(err)
        }
    }
}

module.exports = DbService