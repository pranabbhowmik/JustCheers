import drinkModel from "../models/drinkModel.js";
import fs from "fs";
export const addFood = async (req, res) => {
  try {
    const image_filename = req.file ? req.file.filename : null;

    const food = new drinkModel({
      name: req.body.name,
      description: req.body.description,
      quantity: Array.isArray(req.body.quantity)
        ? req.body.quantity
        : JSON.parse(req.body.quantity), // Adjusted to handle both array and JSON string
      category: req.body.category,
      image: image_filename,
    });

    const savedFood = await food.save();
    res
      .status(201)
      .json({ message: "Drink added successfully!", data: savedFood });
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
    console.log("Received ID to remove:", req.query.id); // Debugging
    const food = await drinkModel.findById(req.query.id);
    if (!food) {
      console.log("Food item not found for ID:", req.query.id); // Debugging
      return res.status(404).json({ error: "Food item not found" });
    }

    if (food.image) {
      fs.unlinkSync(`uploads/${food.image}`, () => {});
    }

    await drinkModel.findByIdAndDelete(req.query.id);
    res.status(200).json({ message: "Food removed successfully!" });
  } catch (error) {
    console.log("Error removing food:", error);
    res.status(500).json({ error: "Problem occurred while removing the item" });
  }
};
