const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');

const dataPath = './Details/useraccount.json' 

// util functions 

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}

accountRoutes.get('/', (req, res) => {
  //res.send('{code:200,desc:success}');

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ "status":"success" }));

});

accountRoutes.post('/parse_body', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
  if ((username=="isara_nakavisute@hotmail.com") && (password=="12345678"))
   res.end(JSON.stringify({ "status":"passed" }));
  else
  res.end(JSON.stringify({ "status":"failed" }));
});


// reading the data
accountRoutes.get('/account', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });


  accountRoutes.post('/account/addaccount', (req, res) => {
   
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
   
    existAccounts[newAccountId] = req.body
     
    console.log(existAccounts);

    saveAccountData(existAccounts);
    res.send({success: true, msg: 'account data added successfully'})
})

// Read - get all accounts from the json file
accountRoutes.get('/account/list', (req, res) => {
  const accounts = getAccountData()
  res.send(accounts)
})

// Update - using Put method
accountRoutes.put('/account/:id', (req, res) => {
   var existAccounts = getAccountData()
   fs.readFile(dataPath, 'utf8', (err, data) => {
    const accountId = req.params['id'];
    existAccounts[accountId] = req.body;

    saveAccountData(existAccounts);
    res.send(`accounts with id ${accountId} has been updated`)
  }, true);
});

//delete - using delete method
accountRoutes.delete('/account/delete/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existAccounts = getAccountData()

    const userId = req.params['id'];

    delete existAccounts[userId];  
    saveAccountData(existAccounts);
    res.send(`accounts with id ${userId} has been deleted`)
  }, true);
})
module.exports = accountRoutes