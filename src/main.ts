//Import Module
import express from 'express';
import Joi from 'joi';
import responseTime from 'response-time';
import helmet from 'helmet';
import morgan from 'morgan';
import config from 'config'

//Import Router
import home from './router-home'

//Import Class
import ParamDataTest from './Data-test1';

//Require Module
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

//Set Class
const app = express();

const paramDataTest = new ParamDataTest();

//PROCESS_ENV
console.log(`NODE_ENV: ${process.env.NODE_ENV}` + ` || app: ${app.get('env')}`);

//APP USE
app.use(express.json());

app.use(helmet());

if (app.get('env') === 'DEV') {
    app.use(responseTime((req, res, time) => {
        console.log('\nrespone...');
        //console.log(req.method, req.url, 'time: ' + time + ' ms');
    }));
    app.use(morgan('tiny'));
}

dbDebugger('Connected to the database...');

//Config
console.log('Config: { ' + config.get('description') + ' || User: ' + config.get('User.name') + ' }')

//Router
app.use('/api/home', home);

//Express Function Get
app.get('/Hi', (req, res) => {

    res.send('im sad');
});

app.get('/api-get/list-temp', (req, res) => {

    res.send([1, 2, 3]);
});

app.get('/api-get/return/:id', (req, res) => {

    res.send(req.params.id);
});

app.get('/api-get/return/:year/:day', (req, res) => {

    res.send(req.params);
});

app.get('/api-get/search/:id', (req, res) => {

    res.json(paramDataTest.get().find(x => x.id === parseInt(req.params.id)));
})

//Express Function Post
app.post('/api-post/push', (req, res) => {

    const postTemp: any = {
        id: (<any>paramDataTest).length() + 1,
        name: req.body.name
    };

    paramDataTest.push(postTemp);
    res.send(paramDataTest.get());
});

app.post('/api-post/push-condition', (req, res) => {

    if (!req.body.name || req.body.name.length < 3) {
        res.status(404).send('minimum 3 charecter');
        return;
    }

    const postTemp: any = {
        id: paramDataTest.lenght() + 1,
        name: req.body.name
    };

    paramDataTest.push(postTemp);
    res.send(paramDataTest.get());
});

app.post('/api-post/push-joi', (req, res) => {

    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(5).required()
    });

    const result = Joi.validate({
        name: req.body.name
    }, schema, function (err, value) {
        if (err) {
            res.status(404).json({
                message: 'Invalid request',
                data: req.body.name
            })
        } else {
            const postTemp: any = {
                id: paramDataTest.lenght() + 1,
                name: req.body.name
            };
            paramDataTest.push(postTemp);
            res.send(paramDataTest.get());
        }
    })

});

app.delete('/api-delete/:id', (req, res) => {
    const errorCheck: any = paramDataTest.get().find(x => x.id === parseInt(req.params.id));
    if (!errorCheck) { res.status(404).send('not found ID') } else {
        paramDataTest.delete(req.params.id);                                                 
        res.send(paramDataTest.get());
    }
});

//Server
app.listen(3000, () => {
    console.log('Start server at port 3000.');
});