const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Item = require("./models/item");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

app.get("/", (req, res) => {
  console.log("Get request to home page...");
  res.render("home.ejs");
});

app.get("/todo", async (req, res) => {
  console.log("Get request for todo page...");
  const items = await Item.find();
  res.render("todo.ejs", { items });
});

app.get("/add", async (req, res) => {
  res.render("additem.ejs");
});

app.get("/editItem/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const item = await Item.findById(id);
  console.log(item);
  res.render("editItem.ejs", { item });
});

app.get("/addItem", async (req, res) => {
  res.render("additem.ejs");
}); 

app.post("/todo", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  console.log(req.body);
  //insert fail safe measures
  res.redirect("/todo");
});

app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const foundItem = await Item.findByIdAndUpdate(id, { ...req.body });
  res.redirect("/todo" );
});

app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.redirect("/todo");
}); 

app.listen(3000, () => {
  console.log("Serving on port 3000!!!");
});
