const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

const testRoutes = require("./routes/test.routes");

app.use("/", testRoutes);

app.get("/health", (req, res) => {

    res.json({

        status: "success",

        message: "Playwright Service Running 🚀"

    });

});

app.listen(PORT, () => {

    console.log(`🚀 Server Running on Port ${PORT}`);

});