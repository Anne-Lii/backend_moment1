//Anne-Lii Hansen 

const {Client} = require("pg");                     //inkludera postgre
const express = require("express");                 //inkludera express
require("dotenv").config();                         //inkludera dotenv filen
const app = express();                              //denna variabeln startar upp applikationen

app.set("view engine", "ejs");                      //view engine satt till ejs
app.use(express.static("public"));                  //för att kunna använda statiska filer. Läggs i mappen public
app.use(express.urlencoded({ extended: true}));     //för att kunna läsa in från formuläret


//anslutnings inställningar från env filen
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl:{
        rejectUnauthorized: false,
    },
});

//ansluter till databasen
client.connect((err) => {
    if (err) {
        console.log("Fel vid anslutning" + err);
    } else {
        console.log("Ansluten till databasen...");
    }
});


//Routing - skriver ut sökvägarna, returnerar vy
app.get("/", async(req, res) => {

    //plocka ut kurserna från databasen
    client.query("SELECT * FROM courses ORDER BY created DESC", (err, result) => {
        if (err) {
         console.log("fel vid SQL-fråga");   
        } else {
            res.render("index", {
                courses: result.rows    //alla sparade rader i databasen sparas i variabeln courses
            });
        }
    });
});

app.get("/addcourse", (req, res) => {
res.render("addcourse");//här visas addcourse sidan
});

//tar emot post från formuläret och skickar till index-sidan
app.post("/addcourse", async(req, res) => {

    //input från formuläret sparade i variabler
    const inputcode = req.body.code;
    const inputname = req.body.name;
    const inputsyllabus = req.body.syllabus;
    const inputprogression = req.body.progression;

    //SQL-fråga
    const result = await client.query("INSERT INTO courses(coursecode, coursename, syllabus, progression) VALUES ($1, $2, $3, $4)", 
    [inputcode, inputname, inputsyllabus, inputprogression]
    );

    res.redirect("/"); //här hamnar man efter input skickats till databasen (redirect istället för render för att undvika dubbla inlägg)
});

app.get("/about", (req, res) => {
res.render("about");//här visas about sidan
});

//kör igång applikationen i vald port från env-filen
app.listen(process.env.PORT, () => {
console.log("Server öppen på port " + process.env.PORT)
});