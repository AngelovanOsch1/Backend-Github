const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

module.exports = app => {

    app.post('/account/login', async (req, res) => {
    
        const { rUsername, rPassword } = req.body;
        
        if(rUsername == "" || rPassword == "") {
            res.status(401).send("Fields cannot be empty");
            return;
        }
    
        var userAccount = await Account.findOne({ username: rUsername});
        if(userAccount != null) 
        
        {
            if(rPassword == userAccount.password) {
                userAccount.lastAuthentication = Date.now();
                console.log(userAccount);
                await userAccount.save();
                
                // res.status(200).send("logging in")
                res.send(userAccount);
                return;
            }
        }

        res.status(401).send("Invalid credentials");
        return;
    });
    
    app.post('/account/create', async (req, res) => {
    
        const { rUsername, rPassword } = req.body;
        
        if(rUsername == "" || rPassword == "") {
            res.send("Fields cannot be empty");
            return;
        }
    
        var userAccount = await Account.findOne({ username: rUsername});
        if(userAccount == null) 
        {
            var newAccount = new Account({
                username: rUsername,
                password: rPassword,
    
                lastAuthentication: Date.now()
            });          
            await newAccount.save();
            res.send(newAccount);

            console.log('Account has been created');

            return;
        } else {
           console.log("Username is taken");
        }
        return;
    });    
}
