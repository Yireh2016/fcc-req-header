// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/whoami',(req,res)=>{
  console.log(req.headers)
  
  // for(let header in req.headers){
  //   console.log(`${header}:  ${req.headers[header]}\n`)
  // }
  
  let result={}
  
  result.ipaddress=req.headers['x-forwarded-for'].match(/^(\d{1,3}\.)\d{1,3}\.\d{1,3}\.\d{1,3}/)[0]
  result.language=req.headers['accept-language']
  result.software=req.headers['user-agent']
  
  console.log(`result ${result}`,result)
  
  /*
  {"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5",
"software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}
  */
  
  /*
  
  {"connection":"close",
  "x-forwarded-for":"186.88.148.130,::ffff:10.10.11.211,::ffff:10.10.84.86",
  "x-forwarded-proto":"http,http,http",
  "x-forwarded-port":"80,80,80",
  "host":"fcc-req-header-parser-jainer.glitch.me",
  "pragma":"no-cache",
  "cache-control":"no-cache",
  "upgrade-insecure-requests":"1",
  "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
  "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "accept-encoding":"gzip, deflate",
  "accept-language":"en,es-ES;q=0.9,es;q=0.8",
  "x-forwarded-host":"fcc-req-header-parser-jainer.glitch.me","traceparent":"00-dc5d2da5977149f4919b1113fc340d18-8be221114d881f9d-01"}
    
    */
  res.json(result)
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
