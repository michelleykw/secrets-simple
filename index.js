import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let isUserAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function checkDate(req, res, next) {
    const date = req.body.date;
    if (date === "12092023") {
        isUserAuthorised = true;
    }
    next();
}
app.use(checkDate);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/hello', (req, res) => {
    if (isUserAuthorised) {
        res.sendFile(__dirname + '/secret.html');
    } else {
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});