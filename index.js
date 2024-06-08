const express = require('express');
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require('./connect');
const path = require('path');
const app = express();
const PORT = 8001;
const URL = require('./model/url');


connectToMongoDB("mongodb://localhost:27017/sort-url").then(()=> console.log("Mongo Db connected"));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());

app.get("/test", async(req,res)=>{
  return res.render('home');
});


app.use("/url",urlRoute);


app.get('/url/:shortURL', async (req, res) => {
    try {
      const sortId = req.params.shortURL;
      const entry = await URL.findOne({ sortId });
      if (entry) {
        res.redirect(entry.redirectUrl);
      } else {
        res.status(404).send('Shortened URL not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});