const express = require("express");
const app = express();
const port = 4242;


app.use(express.static(path.resolve("public")));

// templating //
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
	res.render("index");
});

// Port //
http.listen(process.env.PORT || 4242, () =>
	console.log(`App avaialble on http://localhost:4242`)
)
