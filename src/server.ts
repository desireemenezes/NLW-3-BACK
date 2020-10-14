import express from 'express';
import './database/connection';

const app = express();

app.get('/users', (request, response) => {
    console.log('teste')
})
app.listen(3000);