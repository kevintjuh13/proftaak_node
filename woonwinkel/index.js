const express = require("express");

const app = express();      
const port = 5000;  
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'woonwinkel'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database!');
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('public', { 'content-type': 'text/css' }));


app.get('/', (req, res) => {
    let html = `
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage - Woonwinkel</title>
    <link rel="stylesheet" href="/public/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  </head>
  <nav class="navbar navbar-expand-lg navbar-light">
  <div class="mx-auto" id="navbarNav">
    <ul class="navbar-nav text-center">
      <li class="nav-item active">
        <a class="nav-link" href="/">Products</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Store Finder</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/contact">Contact</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Downloads</a>
      </li>
    </ul>
  </div>
</nav>


<div class="div container-fluid text-center bg-light">
<h1 class="h1-title">Products</h1>
<form method="GET" action="/">
  <div class="input-group">
    <input type="text" name="query" class="form-control" placeholder="Search products">
    <div class="input-group-append">
    <button type="submit" class="btn btn-outline-secondary">Search</button>
  </div>
  </div>
  </form>
  </div>
  
  `;
    
  const query = req.query.query;
  
  if (query) {
    connection.query(
      `SELECT * FROM products WHERE name LIKE '%${query}%' OR description LIKE '%${query}%'`,
      (error, results, fields) => {
        if (error) throw error;
        html += `
          <div class="row">
            ${results.map(result => `
              <div class="col-md-2">
                <div class="card">
                  <img src="data:image/png;base64,${result.img.toString('base64')}" class="card-img-top" alt="${result.name}">
                  <div class="card-body">
                    <h5 class="card-title">${result.name}</h5>
                    <p class="card-text">${result.description}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
        html += `
          </div>
          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmIz0bLQERQ6IWELM5Pj" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-Dziy2mPZlNskJ0+8xyOXVRgGyMMfHLbdr6vD5LVqWmE9DHU/ssp6GvDE6J68vWn0" crossorigin="anonymous"></script>
        `;
        res.send(html);
      }
    );
  } else {
    connection.query(
      `SELECT * FROM products LIMIT 6`,
      (error, results, fields) => {
        if (error) throw error;
        html += `
          <div class="row">
            ${results.map(result => `
              <div class="col-md-2">
                <div class="card">
                  <img src="data:image/png;base64,${result.img.toString('base64')}" class="card-img-top" alt="${result.name}">
                </div>
              </div>
            `).join('')}
          </div>
        `;
        html += `
          </div>
          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmIz0bLQERQ6IWELM5Pj" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-Dziy2mPZlNskJ0+8xyOXVRgGyMMfHLbdr6vD5LVqWmE9DHU/ssp6GvDE6J68vWn0" crossorigin="anonymous"></script>
        	`;
        res.send(html);
      }
    );
  }
});


app.get('/contact', (req, res) => {
  res.send(`
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage - Woonwinkel</title>
    <link rel="stylesheet" href="/public/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  </head>
  <nav class="navbar navbar-expand-lg navbar-light">
  <div class="mx-auto" id="navbarNav">
    <ul class="navbar-nav text-center">
      <li class="nav-item active">
        <a class="nav-link" href="/">Products</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Store Finder</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/contact">Contact</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Downloads</a>
      </li>
    </ul>
  </div>
</nav>

<div class="div container-fluid text-center bg-light">

<h1 class="h1-title">Contact us</h1>
<form class="form" method="POST">
  <label>
    Comment:
    <textarea name="comment"></textarea>
  </label>
  <br>
  <button type="submit">Send</button>
</form>
  </div>

  `);
});

app.post('/contact', (req, res) => {
  const comment = req.body.comment;
  res.send(`
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homepage - Woonwinkel</title>
  <link rel="stylesheet" href="/public/style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<nav class="navbar navbar-expand-lg navbar-light">
<div class="mx-auto" id="navbarNav">
  <ul class="navbar-nav text-center">
    <li class="nav-item active">
      <a class="nav-link" href="/">Products</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Store Finder</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">About</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/contact">Contact</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Downloads</a>
    </li>
  </ul>
</div>
</nav>

<div class="div container-fluid text-center bg-light">
    <h1 class="h1-title">Contact us</h1>
    <form method="POST">
      <label>
        Comment:
        <textarea name="comment"></textarea>
      </label>
      <br>
      <button type="submit">Send</button>
    </form>
    </div>
    <div class="comment-container">
    <div class="div-comment">
    <h1 class="title-comment">Your comment:</h1>
    <p class="comment">${comment}</p>
    </div>
    </div>
  `);
});



app.listen(port, () => {          
  console.log(`Now listening on port ${port}`); 
});
