const express=require("express")
const cors=require("cors")
const { Product, Users,Cart,Order } = require('./db'); 
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
const mongoose=require('mongoose')
// const {cart}=require('../frontend/src/Components/Cart')
const app=express()
dotenv.config()
app.use(express.json());
app.use(cors())

const port = process.env.PORT
const secret_key = process.env.SECRET_KEY






app.get('/',async(req,res)=>{
   
    res.send("hello")
})
app.get('/products',async(req,res)=>{
    const products=await Product.find({})
    res.json(products)
})

app.post('/products',async(req,res)=>{
const {title,description,price,image,category}=req.body
const product=await Product.create({
     title,
      description,
      price,
      image,
      category
})

    res.json(product)
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
app.put('/products/:id',async (req, res) => {
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
  const {name,email,password,role,address,phone}=req.body;
  const userExists= await Users.findOne({email}) 
  if(userExists){
    return res.status(200).json({error:"user already exists"})
  }
const hash = await bcrypt.hash(password,10);

const user=await Users.create({
name,
email,
password:hash,
role:role||"consumer",
address,
phone
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
      { expiresIn: '30d' }
    );

  res.json({ message: "Login successful",token, user });
});

app.post('/cart', async (req, res) => {
  try {
    const { userId, products } = req.body;
    const productToAdd = products[0]; // assuming only 1 product at a time

    if (!userId || !productToAdd || !productToAdd.productId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const existingProductIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productToAdd.productId.toString()
      );

      if (existingProductIndex !== -1) {
        // ❌ Already exists
        return res.status(200).json({ message: "Product already in cart" });
      }

      // ✅ Add product if new
      cart.products.push({ ...productToAdd, quantity: productToAdd.quantity || 1 });

      // ✅ Recalculate total
      cart.totalAmount = cart.products.reduce(
        (sum, p) => sum + p.price * (p.quantity || 1),
        0
      );

      const updated = await cart.save();
      return res.json(updated);
    } else {
      // ✅ Create new cart
      const newCart = new Cart({
        userId,
        products: [{ ...productToAdd, quantity: productToAdd.quantity || 1 }],
        totalAmount: productToAdd.price * (productToAdd.quantity || 1),
      });

      const savedCart = await newCart.save();
      return res.json(savedCart);
    }
  } catch (error) {
    console.error("❌ Cart update failed:", error);
    res.status(500).json({ error: "Something went wrong on the server" });
  }
});


app.post('/order',async(req,res)=>{
  const{id,userId,products,totalAmount}=req.body
  const order = new Order({
   id,
  userId,
  products,
  totalAmount,
  
});

res.json(await order.save())
})

app.get('/orders/:userId',async(req,res)=>{
 try{ const userId=req.params.userId
  const orders=await Order.find({userId:userId}).
  populate('products.productId', 'title price image description')
      .sort({ createdAt: -1 });
  res.json(orders)
 }catch(err){
  console.log(err)
 }
})


app.delete('/order/:id',async(req,res)=>{
  const id=req.params.id
const order=await Order.findOneAndDelete({_id:id})

res.json(order)
})






app.get('/cart/:userId',async (req, res) => {
  try {
   

    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      console.log("No cart found for this user.");
      return res.json({ products: [], totalAmount: 0 });
    }

    res.json(cart);
  } catch (error) {
    console.error("Error in GET /cart/:userId:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// PUT /cart/product/:productId
app.put('/cart/product/:productId', async (req, res) => {
  const { userId, quantity } = req.body;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const product = cart.products.find(
      (p) => p.productId.toString() === productId
    );

    if (!product) return res.status(404).json({ error: 'Product not in cart' });

    product.quantity = quantity; // ✅ This line updates the quantity
    await cart.save();           // ✅ This saves the updated cart in DB

    res.status(200).json({ message: 'Quantity updated successfully', cart });
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



app.delete('/cart/product/:productId',async (req, res) => {
  const productId = req.params.productId;

  try {
    const cart = await Cart.findOne({ userId:req.body.userId,'products.productId': productId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found or product not in cart' });
    }

    // Check if the product exists
    const productIndex = cart.products.findIndex(
      p => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }


    // Remove the product
    const removedProduct = cart.products.splice(productIndex, 1);

    
    await cart.save();

    res.status(200).json({ message: 'Product removed', removedProduct });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});





app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})