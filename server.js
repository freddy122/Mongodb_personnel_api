// Set up
var express  = require('express');
var mongoose = require('mongoose');    
var morgan = require('morgan');            
var bodyParser = require('body-parser');  
var methodOverride = require('method-override'); 
var cors = require('cors');
 var app      = express(); 
// Configuration
mongoose.connect('mongodb://localhost:27017/personnel');

app.use(morgan('dev'));                                        
app.use(bodyParser.urlencoded({'extended':'true'}));           
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});


// Models
var Personnels = mongoose.model('Personnels', {
    nom: String,
    prenom: String,
	adresse: String,
    dateNaiss: String
});
 //console.log(Personnels);
// Routes
 //console.log(app);
    app.get('/api/personnes', function(req, res) {
        Personnels.find(function(err, personnes) {
            if (err)
                res.send(err)
			
            res.json(personnes); // return all personnes in JSON format
			console.log(res);
        });
		console.log("fetching personnes");
		
    });
 
    // creation Personnels 
    app.post('/api/personnes', function(req, res) {
 
        console.log("creating Personnels");
 
        
        Personnels.create({
            nom : req.body.nom,
            prenom : req.body.prenom,
            adresse: req.body.adresse,
			dateNaiss: req.body.dateNaiss,
            done : false
        }, function(err, Personnels) {
            if (err)
                res.send(err);
 
            // get and return all the personnes
            Personnels.find(function(err, personnes) {
                if (err)
                    res.send(err)
                res.json(personnes);
            });
        });
 
    });
 
    // suppression Personnels
    app.delete('/api/personnes/:Personnels_id', function(req, res) {
        Personnels.remove({
            _id : req.params.Personnels_id
        }, function(err, Personnels) {
 
        });
    });
 
 
// port d'ecoute
app.listen(8080);
console.log("App listening on port 8080");