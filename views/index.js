const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const LogInCollection = require("./views/mongo.js");
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true } )); // Change 'false' to 'true'

const templatePath = path.join(__dirname, '../templates'); // Correct 'tempelates' to 'templates'
const publicPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', templatePath); // Change 'tempelatePath' to 'templatePath'
app.use(express.static(publicPath));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    const checking = await LogInCollection.findOne({ name: req.body.name });

    try {
        if (checking && checking.password === req.body.password) { // Check if user already exists
            res.send("User details already exist");
        } else {
            await LogInCollection.create(data); // Use create method to insert
            res.status(201).render("home", { naming: req.body.name });
        }
    } catch (error) {
        res.send("Wrong inputs");
    }
});

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });
        if (check && check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` });
        } else {
            res.send("Incorrect password");
        }
    } catch (error) {
        res.send("Wrong details");
    }
});

app.listen(port, () => {
    console.log('Port connected');
});
