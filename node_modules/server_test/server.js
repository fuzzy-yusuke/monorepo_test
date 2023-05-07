const express = require('express');
const redis = require('./lib/redis');
const usersHandler = require('./handlers/users');

app.get('/user/:id', async(req, res) => {
    try{
        const user = await usersHandler.getUser(req);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('internal error');
    }
});

app.get('/users', async(req, res) => {
    try{
        const locals = await usersHandler.getUsers(req);
        res.render(path.join(__dirname, 'views', 'user.ejs'), locals);
    } catch (err){
        console.error(err);
    }
});

redis.connect()
    .once('ready', async() => {
        try{
            await redis.init();

            app.listen(3000, () => {
                console.log('start listening');
            });
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    })
    .on('error', (err) => {
        console.error(err);
        process.exit(1);
    });

class BadRequest extends Error {
    constructor(message, req){
        super('Bad Request')
        this.status=400;
        this.req = req;
        this.message = message;
    }
}

const validation = (req) => {
    //idが無かったらBadRequestを返す
    if(!req.params.id){
        throw new BadRequest('idがありません', req);
    }
}

const handler = async(req) => {
    validation(req);
};

const wrapAPI = (fn) => {
    return (req, res, next) => {
        try{
            fn(req)
                .then((data) => res.status(200).json(data))
                .catch((e) => next(e));
        } catch(e) {
            next(e);
        }
    };
};

app.get('/user/:id', wrapAPI(handler));

class NotFoundHTML extends Error {
    constructor(message) {
        super('NotFound')
        this.status = 404;
    }
}

app.use((err, req, res, next) => {
    if(err.status){
        return res.status(err.status).send(err.message);
    }
    res.status(500).send('Internal Server Error');
    console.error('[Internal Server Error]', err);
});