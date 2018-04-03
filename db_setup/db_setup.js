var mongoose = require('mongoose');

const dbQuery = (callback) => {
    mongoose.connect('mongodb://localhost:27017/lazyRoomies', {
        server: {
            // sets how many times to try reconnecting
            reconnectTries: Number.MAX_VALUE,
            // sets the delay between every retry (milliseconds)
            reconnectInterval: 1000,
            socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }
        },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    }
    );

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Err:Error in setting up connection'));
    console.log('*** Connected!');
    callback(db);
    // Not working even with mongoose.createConnection. I don't know why.
    // db.once('open', callback(db));
}

module.exports = dbQuery;