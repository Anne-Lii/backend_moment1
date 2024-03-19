//Anne-Lii Hansen 

const express = require("express"); //inkludera express
const app = express();//denna variabeln startar upp applikationen
const port = 3000;//tilldela en port

app.set("view engine", "ejs"); //view engine = ejs

app.use(express.static("public")); //kunna använda statiska filer

//Routing -  här startar applikationen upp
app.get("/", (req, res) => {
res.render("index");
});

//kör igång applikationen
app.listen(port, () => {
console.log("server öppen på " + port)
});