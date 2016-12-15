var express = require('express');

var console = require('tracer').colorConsole();

var bodyParser = (require('body-parser')).json();

var createRouter = (Model)=> {
    
    var router = express.Router();    
    router.use(bodyParser);
        
    router.use((req, res, next)=> {
        req.errorCallback = (err)=> {
            console.log('err', err);
            res.sendStatus(500);
        };
        next();
    });

    router.route('/')
        .get((req, res)=> {
            var where = {};
            var query = req.query;
            if (query.$filter) {
                where = JSON.parse(query.$filter);
            }
            var modelQuery = Model.find(where);
            if (query.$limit && query.$offset) {
                modelQuery.skip(query.$offset).limit(query.$limit);
            }
            if (query.$sort) {
                modelQuery.sort(query.$sort);
            }
            modelQuery.exec()
                .then((models)=>res.json(models))
        })
        .post((req, res)=> {
            var model = new Model(req.body);
            model.save()
                .then((models)=>res.json(models))
                .catch(req.errorCallback)
        });

    router.route('/:id')
        .get((req, res)=> {
            Model.findOne({
                _id: req.params.id,
            })
                .then((model)=>res.json(model))
                .catch(req.errorCallback)
        })
        .delete((req, res)=> {
            Model.remove({
                _id: req.params.id,
            })
                .then(()=>res.json({message: 'success'}))
                .catch(req.errorCallback)
        })
        .post((req, res)=> {
            Model.findOneAndUpdate({
                _id: req.params.id,
            }, req.body)
                .then((model)=>res.json(model))
                .catch(req.errorCallback)
        });
    return router;
};

module.exports = createRouter;