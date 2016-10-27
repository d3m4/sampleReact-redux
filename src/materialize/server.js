// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// request Lib
var request = require('request');
var fs = require('fs');

// lodash
var _ = require('lodash');

var firebase = require('firebase');

// cheerio config
var cheerio = require('cheerio');
var mainUrl = "http://royalroadweed.blogspot.com.br/2014/11/toc.html";

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// [START initialize]
// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  databaseURL: 'https://'+process.env.PROJECT_ID+'.firebaseio.com',
  serviceAccount: {
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
  }
});
// [END initialize]


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/bootstrap", function (request, response) {
  response.sendFile(__dirname + '/views/bootstrap.html');
});

app.get("/materialize", function (request, response) {
  response.sendFile(__dirname + '/views/materializecss.html');
});

app.get('/TOC', function (req, res) {

  url = "http://royalroadweed.blogspot.com.br/2014/11/toc.html";
  var linksObj = [];
  
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
     
      var pageLinks = $('.cover a');
      var links = [];
      var bookNumber = 0;

      pageLinks.each(function (idx, elem) {
          var data = $(elem);
          
          title = data.text();
          href = data.prop('href');

          if (
              (title.toLowerCase().indexOf('chapter 1') > -1 || 
               title.toLowerCase().indexOf('part 1') > -1) && 
               title.toLowerCase().indexOf('chapter 10') === -1 && 
               title.toLowerCase().indexOf('chapter 11') === -1) 
           bookNumber++;

          if(links.indexOf(href) === -1 && title.length > 1) {
            links.push(href);
            linksObj.push({title:title, link: href, bookNumber: bookNumber});
          }
      });         
    } 
    
    res.send(linksObj);
    //res.send(makeLinksFromArray(linksObj));

  });
});

app.get('/Chapter/:href', function (req, res) {

  url = "http://" + req.params.href + ".html";
  var content = {};
  
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
     
      var chapterContent = $('.cover');
      
      $(".post-outer").filter(function(){
        var data = $(this);
        
        title = data.find(".title h2").text();
        date = data.find(".data span").text();
        content = data.find(".cover").html();
      });

      content = {title:title, date: date, content: content};
    } 
    
    res.send(content);
    //res.send(makeLinksFromArray(linksObj));

  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
