const express = require('express');
const app     = express();
const hbs     = require('hbs');
const bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(myFakeMiddleware);

function myFakeMiddleware(req, _, next){
  console.log("myFakeMiddleware was called!");
  req.secretValue = "swordfish";
  next();
}

// route

app.get('/', (req, res) => {
  res.render('user-info-form');
});


app.get('/display-user-info', (req, res, next) => {
  // let name = req.query.name;
  // let age = req.query.age;
  // let superhero = req.query.superhero;
  // in ES6 Syntax:
  // however, switch let to const since it is to never change in the real world:
  const { name, age, superhero } = req.query;

  res.send(`
    Your name is ${name}
    Your age is ${age}
    Your favorite superhero is ${superhero}
    `)
});

app.get('/login', (req, res) => {
  res.render('login')
});

// app.post('/login', (req, res) => {
//   res.send('You\'ve logged in!');
// }); go to the following update below

// app.post('/login', (req, res) => {
//   res.send(req.body);
// }); go to the following update below

app.post('/login', (req, res) => {
  // let email    = req.body.email;
  // let password = req.body.password;
  
  // in ES6 syntax:
  // let {email, password} = req.body
  // however, switch let to const since it is to never change in the real world:
  const { email, password } = req.body
  
  if ( email === "ironhacker@gmail.com" && password === "password"){
    res.send ("Welcome")
  } else {
    res.send ("Go Away")
  }

  // res.send(`Email: ${email}, Password: ${password}`);
});

app.get('/test', (req, res) => {
  const mySecret = req.secretValue;
  res.send(mySecret);
});

// OR in ES6 syntax
// app.get('/test', (req, res) => {
//   const {secretValue: mySecret} = req;
//   res.send(mySecret);
// });



app.listen(3000, () => console.log('App listening on port 3000!'))