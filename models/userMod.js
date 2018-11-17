const fs = require('fs');
const path = require('path');

const p = path.join( // create default place from file
    path.dirname(process.mainModule.filename),
    'data',
    'users.json'
  );

const getAllUsers = (callback) => { 
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            console.log(err);
        }
        else {
            callback(JSON.parse(fileContent));
        }
    })
}

module.exports = class User {
    constructor (id,name) {
        this.id = id,
        this.name = name
    }

     save () {
        getAllUsers(users =>{ // content users.json 
            users.push(this); // the transferred object which we assign in controller instead of this
            fs.writeFile(p,JSON.stringify(users), err=>{ // add new user in file
                if(err) {
                    console.log(err);
                }
            })
        })    
    }
    static fetchAll (callback) {
        getAllUsers(callback);
    }
}