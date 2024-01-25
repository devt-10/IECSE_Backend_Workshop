const mongoose = require("mongoose");
const Product = require("../models/product.js");

mongoose
  .connect(
    "mongodb+srv://devthakkarlm10:AWXdFC2kCICH5fr2@cluster0.liciyj3.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(`DB Connection Error: ${err.message}`));

const seedDB = async () => {
  await Product.deleteMany();
  console.log("Items deleted...");
  for (let i = 0; i < 5; i++) {
    const item = new Product({
      name: `Item ${i}`,
      price: Math.floor(Math.random() * 5) + 0.99,
    });
    // await Item.insertMany(item);
    await item.save();
    console.log("Item inserted!!!");
  }
};

seedDB();
