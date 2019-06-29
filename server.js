var express = require('express'),
    app = express();
    bodyParser = require('body-parser');
    cors = require('cors'); //you can use cors insted of setting the header too allow this port in the app.get
    jwt = require('jsonwebtoken');

app.use(cors({
  origin:'http://localhost:4200' //allows requests coming only from very specific domain. useful for security
}));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.post('/authenticate', function(req, res){
 
  var token = jwt.sign({uname : req.body.username}, 'this-is-the-secret-key', {expiresIn : '1hr'})

  if(req.body.username && req.body.password){
    res.send({
      isLoggedIn:true,
      token:token
    });
  }
  else{
    res.send({
      isLoggedIn:false
    });
  }

});

app.use(function(req,res,next){
  var token = req.body.authtoken || req.query.authtoken || req.headers['authtoken'];//the token can come as http (get or post) or as a header in payload
  jwt.verify(token, 'this-is-the-secret-key', function(err,decoded){
    if(err){
      res.send({
        err : true,
        msg : 'Invalid request'
      })
    }
    else{
      req.decoded = decoded;
      next();
    }

  });

});

app.get('/getproducts',function(req, res){
  console.log(req.decoded);

    res.send([
        {
          "productId":1,
          "productName":"apole",
          "productCode":"IDF43656",
          "releaseDate":" 12 May 2015",
          "description":"kshuh heuheefj djjhuer",
          "price":89.46,
          "starRating":2.4,
          "imageUrl":"https://cdn.pixabay.com/photo/2019/05/14/16/43/hokkaido-4202825_1280.jpg",
        },
    
        {
          "productId":2,
          "productName":"sdhsfgf",
          "productCode":"dSDGH$",
          "releaseDate":"jgjnvs",
          "description":"sggjaksngaks dsgfhrthas",
          "price":23.56,
          "starRating":3.5,
          "imageUrl":"https://cdn.pixabay.com/photo/2019/05/14/16/43/hokkaido-4202825_1280.jpg",
        },
    
        {
          "productId":3,
          "productName":"dfbfmnfd",
          "productCode":"ksdnklKNJND4465",
          "releaseDate":"dfh gfergh",
          "description":"afgth wr hhyjt sdf t",
          "price":45.65,
          "starRating":1.6,
          "imageUrl":"https://cdn.pixabay.com/photo/2019/05/14/16/43/hokkaido-4202825_1280.jpg",
        },
    
        {
          "productId":4,
          "productName":"sdgfgn",
          "productCode":"dfgFGHT4565",
          "releaseDate":"sfdgnh gh e",
          "description":"dsfh dfghgjgsdxgg sdffh s",
          "price":4.6,
          "starRating":3.7,
          "imageUrl":"https://cdn.pixabay.com/photo/2019/05/14/16/43/hokkaido-4202825_1280.jpg",
        },
    
        {
          "productId":5,
          "productName":"dsfhsd",
          "productCode":"DFHHH346DFHG",
          "releaseDate":"sdfhgfbbxc  dffh",
          "description":"sdfh fdfdg dfdfgrj sfderrh",
          "price":2.5,
          "starRating":5,
          "imageUrl":"https://cdn.pixabay.com/photo/2019/05/14/16/43/hokkaido-4202825_1280.jpg",
        },
    
      ]);
})

app.listen(3000,function(){
    console.log('Server running @ localhost : 3000');
})