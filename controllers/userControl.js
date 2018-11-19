const fs = require('fs');
const path = require('path');

const User = require('../models/userMod');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'users.json'
  );

exports.getUsers = (req,res)=>{

    fs.readFile(p,(err,fileContent)=>{
        if(err){
             console.log(err);
         }else{
             const have = true;
             const result = JSON.parse(fileContent);
             res.render('users', {
                 results:result, 
                 have:have, 
                 pageTitle: 'Users',
                 path: '/users'
                });
         }
     })
 }

 exports.getUserById = (req,res)=>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            console.log(err);
            res.sendStatus(400);
            return;
        }else{
            const have = false;
            const id = +req.params.id;
            const result = JSON.parse(fileContent);
            const userId = result.find(user=>{
              return  user.id === id;
            })
            res.render('users', {
                results:userId, 
                have:have
            });
        }
    })
}

exports.addUser = (req,res) => {
    res.render('addUser', {
        pageTitle: 'Add User',
        path: '/add-user'
    })
}

exports.postUser = (req,res) => {
    const id = Date.now();
    const name = req.body.nameUser;
    const user = new User(id,name);
    user.save(); // save new user in users.json
    res.redirect('/users');
}

exports.getAddUser = (req,res) => {
    User.fetchAll(user => { // take users after method save() , where we add user
        res.render('users',{results: user}) // add users in view
    })
}

exports.deleteUser = (req,res) => {
    const id = +req.params.id;// take id in url (req params)
    User.deleteUsers(id); // delete user
    res.redirect('/users');
}

// exports.updateUser = (req,res) => {
//     const id = +req.params.id;
//     const name = req.body.name;
//     User.updateUser(id,name);
//     res.redirect('/users');
// }
