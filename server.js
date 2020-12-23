const express = require('express');
const PORT = process.env.PORT || 3001
const app = express();

//Express Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

//Default response for (not found)
//!!MAKE SURE THIS IS LAST!!
app.use((req, res) => {
    res.status(404).end();
});

//start the express server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});