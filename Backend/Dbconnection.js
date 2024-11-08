require('dotenv').config()

const {Client} = require('pg')
   const client = new Client(
    {
    connectionString:process.env.DatabaseUrl,
    ssl: {
    rejectUnauthorized: false,
  },})

client.connect()
.then(()=>{console.log("connected to db")})
.catch((err)=>console.log("something went wrong"));
