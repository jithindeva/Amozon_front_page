// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ===== Load products =====
const products = JSON.parse(fs.readFileSync("./backend/products.json", "utf-8"));

// ===== API 1: Get all products =====
app.get("/api/products", (req, res) => {
    res.json(products);
});

// ===== API 2: Add to cart (simulate) =====
let cart = [];
app.post("/api/cart", (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        res.json({ message: "Added to cart!", cart });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// ===== API 3: Get cart =====
app.get("/api/cart", (req, res) => {
    res.json(cart);
});

// ===== API 4: Simulated user login =====
app.post("/api/login", (req, res) => {
    const { username } = req.body;
    res.json({ message: `Welcome, ${username}!`, username });
});

// ===== Start server =====
app.listen(PORT, () => {
    console.log(`✅ API server running on http://localhost:${PORT}`);
});
