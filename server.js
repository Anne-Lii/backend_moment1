//Anne-Lii Hansen 

const express = require("express"); //inkludera express
const app = express();//denna variabeln startar upp applikationen
const port = process.env.port | 3000;//tilldela en port
const bodyParser = require("body-parser");//kunna ta emot data från formulär

app.set("view engine", "ejs"); //view engine satt till ejs
app.use(express.static("public")); //för att kunna använda statiska filer. Läggs i mappen public
app.use(bodyParser.urlencoded({ extended: true}));//

//Routing - skriver ut sökvägarna, returnerar vy
app.get("/", (req, res) => {
    const myCoursesArr = [
        { 
            id: "1",
            code: "DT057G",
            name: "Webbutveckling 1", 
            syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/",
            progression: "A"
        },
        { 
            id: "2",
            code: "DT084G",
            name: "Introduktion till programmering i JavaScript", 
            syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/",
            progression: "A"
        },
        { 
            id: "3",
            code: "DT200G",
            name: "Grafisk teknik för webb", 
            syllabus: "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/",
            progression: "A"
        }
    ];

    res.render("index", {
        myCoursesArr
    });//här visas startsidan och array med objekt skickas med
});

app.get("/addcourse", (req, res) => {
res.render("addcourse");//här visas addcourse sidan
});

app.post("/addcourse", (req, res) => {
res.render("addcourse");
});
    
app.get("/about", (req, res) => {
res.render("about");//här visas about sidan
});


//kör igång applikationen i vald port
app.listen(port, () => {
console.log("server öppen på " + port)
});