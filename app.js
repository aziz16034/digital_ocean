const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const request = require('request');
const https = require("https");

const app = express();

app.use('*/css',express.static('public/css'));
app.use('*/images',express.static('public/images'));





app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const fistname = req.body.fname;
    const secondname = req.body.sname;
    const email = req.body.email;

    console.log(fistname, secondname, email);

    const data ={
        members: [
            {
              email_address: email,
              status: "subscribed",
              merge_fields : {
                FNAME: firstname,
                LNAME: secondname
              }
    
            }
    
         ]
        
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/220f6aac05";
    const options = {
        method:"POST",
        auth: "aziza:7570dd6b3545e48f34fda03e01736fec-us7 "
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })


    })

 
     request.write(jsonData);
     request.end();

});


        
    





app.listen(3000, function () {
    console.log("Server started on port 3000")
});



//7570dd6b3545e48f34fda03e01736fec-us7

//220f6aac05