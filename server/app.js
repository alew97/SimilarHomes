const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const url = 'mongodb://localhost/homes'
const Home = require('./models/home')
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.post('/api/homes/gethomes', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true }, function(err){
        if(err) throw err;
        // since the values for min/maxBath, min/maxBed and min/maxFeet are always set in root.component.ts,
        // we can directly add those searches to the findQuery
        var findQuery = {
            NumBaths :{ $gte: req.body.minBath - 0, $lte: req.body.maxBath - 0 },
            NumBedrooms:  { $gte: req.body.minBed - 0, $lte: req.body.maxBed - 0 },
            LivingArea : { $gte: req.body.minFeet - 0, $lte: req.body.maxFeet - 0 }
        };

        // since we are allowing users to leave the Longitude Away and Latitude Away inputs blank,
        // we will only add those searches to the query if latitudeAway or longitudeAway are not null or ""
        if (req.body.latitudeAway && req.body.latitudeAway != "") {
            findQuery.GeoLat = req.body.targetLatitude - ((-1)*(req.body.latitudeAway))
        }
        if (req.body.longitudeAway && req.body.longitudeAway != "") {
            findQuery.GeoLon = req.body.targetLongitude - ((-1)*(req.body.longitudeAway))
        }

        var page = req.body.pageNumber;

        // our configurations for pagination
        var options = {
            limit: 10,
            page: page
        }

        Home.paginate(
            findQuery, options
        , function(err, home){
            if(err) throw err;
            return res.status(200).json({
                status: true,
                data: home.docs
            })  
        })
        
    });
})
 
app.listen(3000, () => console.log('blog server running on port 3000!'))
