import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/jokes", async (req, res) => {
  const { category, keyword, type } = req.query;

  let apiUrl = `https://v2.jokeapi.dev/joke/${category}`;
  apiUrl += `?type=${type}`;
  if (keyword) apiUrl += `&contains=${encodeURIComponent(keyword)}`;

  try {
    const response = await axios.get(apiUrl);
    const joke = response.data;
    res.render("jokes.ejs", { joke });
  } catch (error) {
    console.error("Error fetching joke:", error.message);
    res.render("jokes.ejs", { joke: null, error: "Failed to fetch a joke. Please try again." });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}...`));