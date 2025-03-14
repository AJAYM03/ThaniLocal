const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("ThaniLocal API is running!");
});

// ✅ Get All Locations
app.get("/locations", async (req, res) => {
    const { data, error } = await supabase.from("locations").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// ✅ Add a New Location (Admins & Locals)
app.post("/locations", async (req, res) => {
    const { name, category, description, image_url, latitude, longitude, added_by } = req.body;
    
    const { data, error } = await supabase
        .from("locations")
        .insert([{ name, category, description, image_url, latitude, longitude, added_by }]);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// ✅ Get Itinerary for a User
app.get("/itineraries/:user_id", async (req, res) => {
    const { user_id } = req.params;
    const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("user_id", user_id);
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// ✅ Add a New Product to the Marketplace (Locals Only)
app.post("/marketplace", async (req, res) => {
    const { seller_id, product_name, description, price, contact_info, image_url } = req.body;

    const { data, error } = await supabase
        .from("marketplace")
        .insert([{ seller_id, product_name, description, price, contact_info, image_url }]);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
