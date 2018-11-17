const fs = require('fs');
const path = require('path');

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
             res.render('users', {results:result, have:have});
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
            res.render('users', {results:userId, have:have});
        }
    })
}