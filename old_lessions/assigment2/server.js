const express = require('express');

const app = express();

app.listen(3000);

app.use('/',(request,response,next)=>{
    console.log('Does somehting in this middleware');
    next();
});

app.use('/users',(request,response,next)=>{
    console.log('Does another job here');
    response.send('<h1>Not the first and not the last express</h1>');
})