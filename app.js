const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const mailchimp = require('@mailchimp/mailchimp_marketing');
const { response } = require("express");
const { Console } = require("console");


mailchimp.setConfig({
    apiKey: "ff7fd1c42b78402ca435414a2b168c16-us7",
    server: "us7"
  });


app.use('*/css',express.static('public/css'));
app.use('*/images',express.static('public/images'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    if (response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
        console.log("submitted succesfuly");

    }

    else{
        Console.log("faled");

    }
    


    
 
    const listId = "220f6aac05";
    const subscribingUser = {
        firstName: req.body.fname,
        lastName: req.body.sname,
        email: req.body.email
    };
   
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
          }

          
        });
   
        console.log(
          `Successfully added contact as an audience member. The contact's id is ${response.id}.`
        );
    }
   
    run();
  })

app.listen( process.env.PORT || 3000, function () {
    console.log("Server started on port 3000")
});

//ff7fd1c42b78402ca435414a2b168c16-ut