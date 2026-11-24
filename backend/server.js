const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
// Middleware
app.use(cors({
    origin: "http://localhost:5500",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]}));
app.use(express.json());
// Authentication Middleware
function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    if (token !== "Bearer my-secret-token") {
        return res.status(401).json({
            message: "Unauthorized! Invalid or missing token."});}
    next();}
// Public API
app.get("/", (req, res) => {
    res.json({
        message: "Backend is running successfully!"});});
// Protected API
app.get("/api/profile", authenticateToken, (req, res) => {
    res.json({
        message: "Authorized access successful!",
        user: {
            name: "mak",
            role: "Student" }});});
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);});