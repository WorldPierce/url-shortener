// server.js
// where your node app starts
// init project
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var shortUrl = require('./models/shortUrl');
var connected=false;

//connect to database mongoose pluralizes connections
var MONGODB_URI = 'mongodb://admin:admin@ds151702.mlab.com:51702/shorturldb';
console.log(process.env.USER)
mongoose.connect(MONGODB_URI);

var datastore = require('./datastore').sync;
//datastore.initializeApp(app);

app.use(cors());
app.use(bodyParser.json());

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  //initializeDatastoreOnProjectCreation();
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/new/:urlToShorten(*)', (req, res)=>{
  //ES6 deconstuctor grabs var of same name
  var {urlToShorten} = req.params;
  
  //REGEX FOR URL
  var experession = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  
  
  if(experession.test(urlToShorten) === true){
    var short = Math.floor(Math.random() * 100000).toString();
    
    var data = new shortUrl({
      originalUrl: urlToShorten,
      shorterUrl: short
    });
    
    // data.save(err=>{
    //   if(err){
    //     return res.send(err);
    //   }
    // });
    
 //   var url = datastore.get("urls");
    //url.push(data);
    res.json(data);
  }
  var data = new shortUrl({
    originalUrl: urlToShorten,
    shorterUrl: 'InvalidUrl'
  })
  return res.json(data);
  //console.log(urlToShorten);
});

//query database and forward to original url
app.get('/:urlToForward', (req,res)=>{
  var shorterUrl = req.params.urlToForward;
  //find url
  //var url = datastore.get(shorterUrl);
  //console.log(url);
  shortUrl.findOne({'shorterUrl': shorterUrl}, (err,data) =>{
    if(err){
      return res.send(err);
    }
    var re = new RegExp("^(http|https)://", "i");
    var strCheck = data.originalUrl;
    if(re.test(strCheck)){
      res.redirect(301, data.originalUrl);
    }
    else{
      res.redirect(301, 'http://' + data.originalUrl);
    }
  });
});

function initializeDatastoreOnProjectCreation() {
  if(!connected){
    connected = datastore.connect();
  }
  if (!datastore.get("initialized")) {
    //datastore.set("posts", initialPosts);
    datastore.set("initialized", true);
  }  
}
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
