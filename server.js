//Anne-Lii Hansen 

const express = require("express"); //inkludera express
const app = express();//denna variabeln startar upp applikationen
const port = 3000;//tilldela en port

app.set("view engine", "ejs"); //view engine satt till ejs

app.use(express.static("public")); //för att kunna använda statiska filer. Läggs i mappen public

//Routing 
app.get("/", (req, res) => {
res.render("index");
});

app.get("/addcourse", (req, res) => {
res.render("addcourse");
});
    
app.get("/about", (req, res) => {
res.render("about");
});


//kör igång applikationen i vald port
app.listen(port, () => {
console.log("server öppen på " + port)
});