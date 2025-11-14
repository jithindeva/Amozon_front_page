// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // ======== SEARCH BAR ========
    const searchInput = document.querySelector(".search-input");
    const searchIcon = document.querySelector(".search-icon");

    searchIcon.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching for "${query}"...`);
            // Simulate backend API call
            console.log(`Search Query Sent: ${query}`);
        } else {
            alert("Please enter something to search.");
        }
    });

    // ======== SIGN IN SECTION ========
    const signin = document.querySelector(".nav-signin");
    signin.addEventListener("click", () => {
        const username = prompt("Enter your name to sign in:");
        if (username) {
            signin.innerHTML = `<p><span>Hello, ${username}</span></p><p class="nav-second">Your Account</p>`;
            localStorage.setItem("user", username);
        }
    });

    // Load stored user
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        signin.innerHTML = `<p><span>Hello, ${storedUser}</span></p><p class="nav-second">Your Account</p>`;
    }

    // ======== CART FUNCTIONALITY ========
    const cart = document.querySelector(".nav-cart");
    let cartCount = localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")) : 0;
    updateCartDisplay();

    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.style.background = "#febd68";
        button.style.border = "none";
        button.style.padding = "8px 12px";
        button.style.marginTop = "10px";
        button.style.cursor = "pointer";
        button.style.borderRadius = "5px";

        box.querySelector(".box-content").appendChild(button);

        button.addEventListener("click", () => {
            cartCount++;
            localStorage.setItem("cartCount", cartCount);
            updateCartDisplay();
            alert("Item added to cart!");
        });
    });

    function updateCartDisplay() {
        cart.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${cartCount})`;
    }

    // ======== RETURN & ORDERS ========
    const returns = document.querySelector(".nav-return");
    returns.addEventListener("click", () => {
        alert("No previous orders found. Start shopping today!");
    });

    // ======== PANEL DEALS CLICK ========
    const deals = document.querySelector(".panel-deals");
    deals.addEventListener("click", () => {
        alert("Redirecting to electronics deals...");
    });

    // ======== CATEGORY FILTER SIMULATION ========
    const panelOptions = document.querySelectorAll(".panel-opp p");
    panelOptions.forEach((opt) => {
        opt.addEventListener("click", () => {
            alert(`Showing results for ${opt.textContent}`);
        });
    });

    // ======== SAVE THEME PREFERENCE ========
    const hero = document.querySelector(".hero-section");
    hero.addEventListener("dblclick", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const shopSection = document.querySelector(".shop-section");
    const cart = document.querySelector(".nav-cart");
    let cartCount = 0;

    // ======== Fetch Products from Backend ========
    fetch("http://localhost:5000/api/products")
        .then(res => res.json())
        .then(products => {
            shopSection.innerHTML = ""; // Clear existing boxes
            products.forEach(p => {
                const box = document.createElement("div");
                box.classList.add("box");
                box.innerHTML = `
                    <div class="box-content">
                        <h2>${p.name}</h2>
                        <div class="box-img" style="background-image: url('${p.image}');"></div>
                        <p>Price: ₹${p.price}</p>
                        <button class="add-btn" data-id="${p.id}">Add to Cart</button>
                    </div>
                `;
                shopSection.appendChild(box);
            });

            // Attach button listeners
            document.querySelectorAll(".add-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    const id = parseInt(btn.getAttribute("data-id"));
                    addToCart(id);
                });
            });
        })
        .catch(err => console.error("Error loading products:", err));

    // ======== Add to Cart (API Call) ========
    function addToCart(id) {
        fetch("http://localhost:5000/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: id })
        })
        .then(res => res.json())
        .then(data => {
            cartCount++;
            cart.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${cartCount})`;
            alert(data.message);
        });
    }

    // ======== Sign In Simulation ========
    const signin = document.querySelector(".nav-signin");
    signin.addEventListener("click", () => {
        const username = prompt("Enter your name to login:");
        fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username })
        })
        .then(res => res.json())
        .then(data => {
            signin.innerHTML = `<p><span>Hello, ${data.username}</span></p><p class="nav-second">Your Account</p>`;
        });
    });
});
fetch("http://localhost:5000/api/products")
    .then(res => res.json())
    .then(products => {
        const shopSection = document.querySelector(".shop-section");
        shopSection.innerHTML = "";
        products.forEach(p => {
            const box = document.createElement("div");
            box.classList.add("box");
            box.innerHTML = `
                <div class="box-content">
                    <h2>${p.name}</h2>
                    <div class="box-img" style="background-image: url('${p.image}');"></div>
                    <p>₹${p.price}</p>
                    <button class="add-btn" data-id="${p.id}">Add to Cart</button>
                </div>
            `;
            shopSection.appendChild(box);
        });

        // Add button events
        document.querySelectorAll(".add-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.getAttribute("data-id"));
                addToCart(id);
            });
        });
    });
function addToCart(id) {
    fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id })
    })
    .then(res => res.json())
    .then(data => {
        alert("🛒 " + data.message);
    })
    .catch(err => console.error("Cart error:", err));
}
const signin = document.querySelector(".nav-signin");
signin.addEventListener("click", () => {
    const username = prompt("Enter your name:");
    fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
    })
    .then(res => res.json())
    .then(data => {
        signin.innerHTML = `<p><span>Hello, ${data.username}</span></p><p class="nav-second">Your Account</p>`;
    });
});
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let products = [
    { id: 1, name: "Health & Personal Care", price: 499, image: "https://images.unsplash.com/photo-1588776814546-3f8afc6367d5" },
    { id: 2, name: "Clothes", price: 799, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
    { id: 3, name: "Furniture", price: 1999, image: "https://images.unsplash.com/photo-1616628182509-3d19ff1f48ec" },
    { id: 4, name: "Electronics", price: 1299, image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f" }
];

let cart = [];

// Get all products
app.get("/api/products", (req, res) => res.json(products));

// Add to cart
app.post("/api/cart", (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    cart.push(product);
    res.json({ message: "Product added to cart", cart });
});

// Simulate login
app.post("/api/login", (req, res) => {
    const { username } = req.body;
    res.json({ message: `Welcome ${username}`, username });
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));


