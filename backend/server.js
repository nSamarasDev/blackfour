const path = require('path')
const morgan = require('morgan')
const express = require('express')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
const colors = require('colors')

const PORT = process.env.PORT || 5050

const app = express();

connectDB()


app.use(express.json({ extended: false }));


app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

//Define routing and comments
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/contact", require("./routes/api/contact"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/post"));
app.use("/api/article", require("./routes/api/article"));
app.use("/api/reset", require("./routes/api/reset"));



// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(PORT, () => console.log(`Server running on ${PORT}`))

