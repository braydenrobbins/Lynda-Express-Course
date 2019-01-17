import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import data from './data/MOCK_DATA.json';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

//app.use(express.json());
app.use(express.urlencoded({extened: true}));

//This is for Proxies
app.set('trust proxy', 'loopback');

app.use('/images', express.static('images'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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

app.post('newItem', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.route('/item')
    .get((req, res) => {
        throw new Error();
        //res.end()
        //res.redirect("http://www.google.com")
        //res.download("images/rocket.jpg")
        //res.send(`a get request with /item route on port ${PORT}`)
    })
    .put((req, res) =>
        res.send(`a put with /item route on port ${PORT}`)
    )
    .delete((req, res) =>
        res.send(`a delete with /item route on port ${PORT}`)
);

// Error hnadling funtion
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Red Alert! Red Alert!: ${err.stack}`)
});

app.listen(PORT, () =>{
    console.log(`Your servr is running on port ${PORT}`);
});