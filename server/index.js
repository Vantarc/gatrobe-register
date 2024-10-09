const express = require('express');
const app = express();
const credentials = require("./credentials")
app.use(express.json())
app.use("/", express.static("../client/build"))
const ipa = require('node-freeipa')

app.post('/newregister', async (req, res) => {
    try{

        await ipa.json_metadata()

        req.body.name = req.body.name.trim()
        let lastIndexOfWhiteSpace = req.body.name.lastIndexOf(" ")

        let x = await ipa.stageuser_add([req.body.name.replace(" ", "").toLowerCase()], {
            "givenname": req.body.name.substr(0, lastIndexOfWhiteSpace),
            "sn": req.body.name.substr(lastIndexOfWhiteSpace + 1),
            "cn": req.body.name,
            "mail": req.body.email,
            "userpassword": req.body.password,
            "krbpasswordexpiration": "99990924155614Z"
        }).then((e)=> {
            console.log(e)
            if(e.error) throw Error(e)
            })
        console.log(x)
        await fetch("https://cms.gatrobe.de/flows/trigger/8007285b-9755-4247-b2b8-a0c46d078403")
        res.status(200).send("User created!");
    } catch (e) {
        res.status(500).send("Something went wrong!");
    }

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

