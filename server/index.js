const express = require('express');
const app = express();
const credentials = require("./credentials")
app.use(express.json())
app.use("/", express.static("../client/build"))
const ipa = require('node-freeipa')

app.post('/newregister', (req, res) => {

    ipa.json_metadata().then(result => {

        req.body.name = req.body.name.trim()
        let names = req.body.name.split(" ")
        ipa.stageuser_add([req.body.name.replace(" ", "").toLowerCase()], {
            "givenname": names[0],
            "sn": names[names.length - 1],
            "cn": req.body.name,
            "mail": req.body.email,
            "userpassword": req.body.password,
            "krbpasswordexpiration": "99990924155614Z"
        }).then((e) => { 
            console.log(e) 
            fetch("https://cms.gatrobe.de/flows/trigger/8007285b-9755-4247-b2b8-a0c46d078403")
        }).catch(e => { console.log(e) })
    }).catch(error => {
    });
})


app.listen(3000, () => {
    const opts = {
        server: "ipa.gatrobe.de",
        auth: {
            user: credentials.FREEIPA_USERNAME,
            pass: credentials.FREEIPA_PASSWORD
        }
    };
    ipa.configure(opts);
    console.log('server listening on port 3000')
})

