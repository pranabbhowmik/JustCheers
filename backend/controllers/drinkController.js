import drinkModel from "../models/drinkModel.js";
import fs from "fs";
export const addFood = async (req, res) => {
  try {
    const image_filename = req.file ? req.file.filename : null;

    const food = new drinkModel({
      name: req.body.name,
      description: req.body.description,
      quantity: JSON.parse(req.body.quantity), // Adjust to handle array of sizes and prices
      category: req.body.category,
      image: image_filename,
    });

    const savedFood = await food.save();
    res
      .status(201)
      .json({ message: "Food added successfully!", data: savedFood });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFoodsList = async (req, res) => {
  try {
    const drinks = await drinkModel.find();
    res.status(200).json(drinks);
  } catch (error) {
    console.error("Error getting food list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove the food item from the database
export const removeFood = async (req, res) => {
  try {
    const food = await drinkModel.findById(req.body.id);
    if (food.image) {
      fs.unlinkSync(`uploads/${food.image}`, () => {});
    }

    await drinkModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ message: "Food removed successfully!" });
  } catch (error) {
    console.log("Error removing food:", error);
    res.status(500).json({ error: "Problem occur To remove Items" });
  }
};
