const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
console.log(express);

//Start Express Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
    //connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Connected to the election database.');
});
//End Express Middleware

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

//start database retreival
db.all(`SELECT * FROM candidates`, (err, rows) => {
    // console.log(rows);
})
    //get a single candidate
db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if(err) {
        console.log(err);
    }
    console.log(row);
})
    //delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.run(sql, params, function(err, result) {
        if(err) {
            res.status(400).json({error: res.message});
            return;
        }
        
        res.json({
            message: 'succesfully deleted',
            changes: this.changes
        });
    });
});

//Default response for (not found)
//!!MAKE SURE THIS IS LAST!!
app.use((req, res) => {
    res.status(404).end();
});

//start the express server on port 3001
//server starts after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});