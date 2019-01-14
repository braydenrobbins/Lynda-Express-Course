import express from 'express';
import data from './data/MOCK_DATA.json';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use('/images', express.static('images'));

app.get('/', (req, res) =>
    // get data first
    res.json(data)
);

app.get('/item/:id', (req, res, next) => {
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    res.send(data[user]);
    next();
}, (req, res) =>
    console.log("Did you get the right data?")
);


app.route('/item')
    .get((req, res) => {
        //res.end()
        //res.redirect("http://www.google.com")
        //res.download("images/rocket.jpg")
        res.send(`a get request with /item route on port ${PORT}`)
    })
    .put((req, res) =>
        res.send(`a put with /item route on port ${PORT}`)
    )
    .delete((req, res) =>
        res.send(`a delete with /item route on port ${PORT}`)
);

app.listen(PORT, () =>{
    console.log(`Your servr is running on port ${PORT}`);
    console.log(data)
});