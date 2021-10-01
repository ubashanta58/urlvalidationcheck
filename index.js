const express = require('express');
const app = express();
const PORT = 3000;

app.get('/app', function(req, res){
    res.status(200).send("url validation");
})

app.listen(PORT, function(err){
    if(err) console.log(err);
    console.log("Server Listening on PORT", PORT);
})