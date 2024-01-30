const express = require('express');
const pool = require('./db');
const fs = require('fs');
const port = 3000;

const app = express();

const { 
    createUserHandler,
    getArtHandler,
    getArtByIdHandler,
    postCommentHandler, 
} = require('./controllers/artHandler');
const { 
    setupTablesHandler, 
    initializeDatabaseHandler 
} = require('./controllers/setupHandler');

const middleware = require('./middleware');

app.use(express.json());


app.get('/setup-tables', 
    middleware.wrapAsyncFunction(setupTablesHandler)
);

app.get('/initialize-database', 
    middleware.wrapAsyncFunction(initializeDatabaseHandler)
);

app.get('/api/art', 
    middleware.wrapAsyncFunction(getArtHandler)
);

app.get('/api/art/:id', 
    middleware.wrapAsyncFunction(getArtByIdHandler)
);

app.post('/api/users', 
    middleware.wrapAsyncFunction(createUserHandler)
);

app.post('/api/art/:id/comments', 
    middleware.wrapAsyncFunction(postCommentHandler)
);

app.listen(port, () => console.log(`Server has started on port: ${port}`))