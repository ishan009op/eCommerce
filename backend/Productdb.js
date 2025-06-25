const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const mongodb = process.env.mongo_uri

mongoose.connect(mongodb).then(()=>{
// console.log("done")
}).catch((err)=>{
    console.log(err)
})

const productSchema=mongoose.Schema({
     title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model('products', productSchema);
