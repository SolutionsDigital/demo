// import sqlite3 package to test SQL database + Node

const  sqlite3  =  require('sqlite3').verbose();



// Create a database object
// Note database is "disk file database" 
let sqlite_db = new sqlite3.Database('./data/test_db_node.db', sqlite3.OPEN_READWRITE);

// create a route to 'sql" via the the POST method
// request has all the http request from the client
// response is the variable the server will send back to the client
app.post('/sql', (request, response) => {   // Console.log the request from the client to the server console to check
      
    console.log('I got a request to write to the sql db!');

      
    const data = request.body   // create a timestamp
          
    const timestamp = Date.now();   // assign timestamp to data object
      
    data.timestamp = timestamp;

       //  insert one row into the table ABOVE
      
    sqlite_db.run(`INSERT INTO test_table(lat, lon, timestamp) VALUES(?,?,?)`, [data.lat, data.lon, data.timestamp], function(err) {  
        if (err) {     return console.log(err.message);   }   // get the last insert id
          
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

       // complete the response
      
    response.json({     status: 'successfully wrote to sql database',     timestamp: timestamp,     latitude: request.body.lat,     longitude: request.body.lon   });
});