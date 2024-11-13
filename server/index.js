const express = require('express');
const app = express();
const credentials = require("./credentials")
app.use(express.json())
app.use("/", express.static("../client/build"))
const ipa = require('node-freeipa')
var unidecode = require('unidecode');
app.post('/newregister', async (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    try{
        await ipa.json_metadata()

        req.body.name = req.body.name.trim()
        let lastIndexOfWhiteSpace = req.body.name.lastIndexOf(" ")
        
        let ipaUID = req.body.name.replaceAll(" ", "").toLowerCase()
        ipaUID = ipaUID.replaceAll("ü", "ue")
        ipaUID = ipaUID.replaceAll("ä", "ae")
        ipaUID = ipaUID.replaceAll("ö", "oe")
        ipaUID = ipaUID.replaceAll("ß", "ss")
        ipaUID = ipaUID.replaceAll("è", "e")
        ipaUID = ipaUID.replaceAll("é", "e")
        ipaUID = ipaUID.replaceAll("à", "a")
        ipaUID = ipaUID.replaceAll("á", "a")
        ipaUID = unidecode(ipaUID)
        let x = await ipa.stageuser_add([ipaUID], {
            "givenname": req.body.name.substr(0, lastIndexOfWhiteSpace),
            "sn": req.body.name.substr(lastIndexOfWhiteSpace + 1),
            "cn": req.body.name,
            "mail": [ipaUID + "@gatrobe.de", req.body.email],
            "userpassword": req.body.password,
            "krbpasswordexpiration": "99990924155614Z"
        }).then((e)=> {
            console.log(e)
            if(e.error) throw Error(e)
            })
        console.log(x)
        await fetch("https://cms.gatrobe.de/flows/trigger/8007285b-9755-4247-b2b8-a0c46d078403")
        fetch("https://ntfy.gatrobe.de/users", {
            method: 'POST',
            headers: {
              "prio": "low",
            },
            body: `Es wurde ein neuer Nutzer mit der NutzerID ${req.body.name.replaceAll(" ", "").toLowerCase()} und der Email ${req.body.email} von der IP ${ip} erstellt! `
          });
        
        res.status(200).send("User created!");
    } catch (e) {
        fetch("https://ntfy.gatrobe.de/users", {
            method: 'POST',
            headers: {
              "prio": "high",
            },
            body: `Es gab einen Fehler bei der Nutzererstellung für den Benutzer ${req.body.name} mit der Email ${req.body.email} von der IP ${ip}!`
          });
        res.status(500).send("Something went wrong!");
    }

})


app.listen(3000, () => {
    const opts = {
        server: "ipa.gatrobe.de",
        auth: {
            user: credentials.FREEIPA_USERNAME,
            pass: credentials.FREEIPA_PASSWORD
        },
            cacheFolder: "./credentials/",
            expires: 60
    };
    ipa.configure(opts);
    console.log('server listening on port 3000')
})

