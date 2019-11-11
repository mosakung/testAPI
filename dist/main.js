"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var joi_1 = __importDefault(require("joi"));
var response_time_1 = __importDefault(require("response-time"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var config_1 = __importDefault(require("config"));
var Data_test1_1 = __importDefault(require("./Data-test1"));
var app = express_1.default();
var paramDataTest = new Data_test1_1.default();
//APP USE
console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("app: " + app.get('env'));
app.use(express_1.default.json());
app.use(helmet_1.default());
if (app.get('env') === 'DEV') {
    app.use(response_time_1.default(function (req, res, time) {
        console.log('\nrespone...');
        //console.log(req.method, req.url, 'time: ' + time + ' ms');
    }));
    app.use(morgan_1.default('tiny'));
}
//Config
console.log('Config: ' + config_1.default.get('description') + ' || User: ' + config_1.default.get('User.name'));
//Express Function Get
app.get('/Hi', function (req, res) {
    res.send('im sad');
});
app.get('/api-get/list-temp', function (req, res) {
    res.send([1, 2, 3]);
});
app.get('/api-get/return/:id', function (req, res) {
    res.send(req.params.id);
});
app.get('/api-get/return/:year/:day', function (req, res) {
    res.send(req.params);
});
app.get('/api-get/search/:id', function (req, res) {
    res.json(paramDataTest.get().find(function (x) { return x.id === parseInt(req.params.id); }));
});
//Express Function Post
app.post('/api-post/push', function (req, res) {
    var postTemp = {
        id: paramDataTest.length() + 1,
        name: req.body.name
    };
    paramDataTest.push(postTemp);
    res.send(paramDataTest.get());
});
app.post('/api-post/push-condition', function (req, res) {
    if (!req.body.name || req.body.name.length < 3) {
        res.status(404).send('minimum 3 charecter');
        return;
    }
    var postTemp = {
        id: paramDataTest.lenght() + 1,
        name: req.body.name
    };
    paramDataTest.push(postTemp);
    res.send(paramDataTest.get());
});
app.post('/api-post/push-joi', function (req, res) {
    var schema = joi_1.default.object().keys({
        name: joi_1.default.string().min(3).max(5).required()
    });
    var result = joi_1.default.validate({
        name: req.body.name
    }, schema, function (err, value) {
        if (err) {
            res.status(404).json({
                message: 'Invalid request',
                data: req.body.name
            });
        }
        else {
            var postTemp = {
                id: paramDataTest.lenght() + 1,
                name: req.body.name
            };
            paramDataTest.push(postTemp);
            res.send(paramDataTest.get());
        }
    });
});
app.delete('/api-delete/:id', function (req, res) {
    var errorCheck = paramDataTest.get().find(function (x) { return x.id === parseInt(req.params.id); });
    if (!errorCheck) {
        res.status(404).send('not found ID');
    }
    else {
        paramDataTest.delete(req.params.id);
        res.send(paramDataTest.get());
    }
});
//Server
app.listen(3000, function () {
    console.log('Start server at port 3000.');
});
//# sourceMappingURL=main.js.map