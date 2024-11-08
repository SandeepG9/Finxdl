const express = require('express')
const bodyparser =  require('body-parser')
const cors = require('cors')
const app = express()
const db = require("./Dbconnection")
const {prismaClient, PrismaClient} = require('@prisma/client')
app.use(bodyparser.json())

const corsOption = {
     origin: 'https://fnxdlfrontend.vercel.app',
     methods: ['GET', 'POST'],
     allowedHeaders: ['Content-Type', 'Authorization'], 
    }
app.use(cors(corsOption))

async function createUser(userData)
{
    if(userData.firstName==="" ||userData.email===""||userData.lastName===""||userData.phone===""||userData.graduationYear===""||userData.city==="")
    {
        console.log("jshgaj")
        return 0
    }
    else{
            const prisma  = new PrismaClient()
            const userCreated = await prisma.Users.create({ 
                data:{
                    "first_name":userData.firstName,
                    "email":userData.email,
                    "last_name":userData.lastName,
                    "phone_number":userData.phone,
                    "graduation_year":userData.graduationYear,
                    "city":userData.city
                }}
            )
            return userCreated
        }
}
app.post('/downloadBroucher',(req,res)=>{
    const createdUser = createUser(req.body)
    if(createdUser)
    {
        res.json({message:"User Created"})
    }
    else{
        res.status(401).json({message:"Field is empty"})
    }
})

app.listen(4000,()=>{
    console.log("app is listening at port 4000")
})
