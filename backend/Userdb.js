const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const mongodb = process.env.mongo_uri

mongoose.connect(mongodb).then(()=>{
// console.log("done")
}).catch((err)=>{
    console.log(err)
})

const UserSchema=mongoose.Schema({
    name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['consumer', 'seller'], default: 'consumer' },
  createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model('User', UserSchema);
