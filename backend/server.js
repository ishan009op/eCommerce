const express=require("express")
const cors=require("cors")
const Product=require('./Productdb')
const Users=require('./Userdb')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")

const app=express()
dotenv.config()
app.use(express.json());
app.use(cors())

const port = process.env.port
const secret_key = process.env.Secret_key





app.get('/',async(req,res)=>{
   
    res.send("hello")
})
app.get('/products',async(req,res)=>{
    const products=await Product.find({})
    res.json(products)
})

app.post('/products',async(req,res)=>{
const {title,description,price,image,category}=req.body
Product.create({
     title,
      description,
      price,
      image,
      category
})
const products=await Product.find({})
    res.json(products)
})

app.get('/products/:id',async(req,res)=>{
    let id=req.params.id
    const product= await Product.findById(id)
    res.json(product)
})
app.delete('/products/:id',async(req,res)=>{
    let id=req.params.id
    const product= await Product.findOneAndDelete({_id:id})
    res.json(product)
})
app.put('/products/:id', async (req, res) => {
  const id = req.params.id;
  const { title, description, price, image, category } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },                        // ✅ Correct usage
      { title, description, price, image, category },
      { new: true }                       // optional: returns the updated doc
    );

    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.post('/register',async(req,res)=>{
  const {name,email,password,role}=req.body;
  const userExists= await Users.findOne({email}) 
  if(userExists){
    return res.status(200).json({error:"user already exists"})
  }
const hash = await bcrypt.hash(password,10);

const user=await Users.create({
name,
email,
password:hash,
role:role||"consumer"
})

res.json(user)

})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }
   const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      secret_key,
      { expiresIn: '3d' }
    );

  res.json({ message: "Login successful",token, user });
});



app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})