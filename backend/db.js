const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongodb = process.env.MONGO_URI;

// Connect to MongoDB (once only)
mongoose.connect(mongodb)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });

// Product Schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, enum: ['consumer', 'seller'], default: 'consumer' },
  createdAt: { type: Date, default: Date.now }
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: mongoose.Schema.Types.ObjectId,
    title: String,
    price: Number,
    image: String,
    quantity:Number,
     
    },
     
  ],
  totalAmount: Number,
});
const OrderSchema = new mongoose.Schema({
  id:{
     type: mongoose.Schema.Types.ObjectId,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export both models
module.exports = {
  Product: mongoose.model('Product', productSchema),
  Users: mongoose.model('users', userSchema),
  Cart:mongoose.model("cart",CartSchema),
  Order:mongoose.model("Order",OrderSchema)
};
