import {Router} from 'express';
var sql = require('mssql');

var config = {
    user: 'demo',
    password: 'ppp',
    server: 'bbb', // You can use 'localhost\\instance' to connect to named instance 
     
    options: {
        encrypt: true ,// Use this if you're on Windows Azure 
        database: 'jjj',
        
    }
}

const location = Router();

/* GET Location Data from sql azure. */
location.get('/', function(req, res, next) {   
    
    var connection = new sql.Connection(config,function (err){
        var a;
        if(err){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write("Got error :-( " + err);
            res.end("");
            return;
               }
        
        var request = connection.request(); // or: var request = connection.request(); 
            request.query('Select Location from Datacenters Order by DataCenterId', function(err, recordset) {
           
            if(err){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write("Got error :-( " + err);
            res.end("");
            return;
                   }
                   
            res.header('Content-Type: application/json');
            var response = [];             
            for (var i = 0; i < recordset.length; i++) {
                          response.push({Location:recordset[i].Location})           
            // res.json({ID:recordset[i].ID ,Type:recordset[i].Type});
         }
         res.send(response);
         res.end("");    
         
    }); 
    })
});

export default location;
