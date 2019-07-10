var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser"); 

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("styling"))

var con = mysql.createConnection({
  host     : "backend-training.cldq4iyr6wzu.ap-south-1.rds.amazonaws.com",
  user     : "stanzanewdb",
  password : "stanzanewdb",
  database : "locator"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get("/",function(req,res){
    q1 = "select count(*) as CNT_INS from INSTITUTIONS";
    con.query(q1,function(err,r1){
        if(err) throw err;
        console.log(r1);
        q2 = "select count(*) as CNT_PG from EXISTING_PROPERTIES"
        con.query(q2,function(err,r2){
            if(err) throw err;
            console.log(r2);
            q3 = "select count(*) as CNT_RENT from RENTAL_PROPERTIES_MB"
            con.query(q3,function(err,r3){
                if(err) throw err;
                console.log(r3);
                res.render("main.ejs",{r1:r1,r2:r2,r3:r3});
            });
        });
    });
});

app.post("/viewtable",function(req,res){
    var city = (req.body.city)
    var i;
    for(i = city.length-1; ;i--){
        if(city[i]=='>'){
            break;
        }
    }
    i++;
    city = city.substring(i);
    city = city.charAt(0).toUpperCase() + city.slice(1)
    console.log(city);
    var mapurl = {
        Navimumbai : "https://www.google.com/maps/d/viewer?mid=18zvTSJJfkNqfE-szAo3kPYlpyATvC7q4&ll=",
        Mumbai : "https://www.google.com/maps/d/viewer?mid=1ZdVy2DWblS_c2qLIS2UFd0il53u6X9Dg&ll=",
        Delhi : "https://www.google.com/maps/d/viewer?mid=11A2Zz1abR_f1vihblNR5RJ7nF-ydJJH1&ll=",
        Pune : "https://www.google.com/maps/d/viewer?mid=19pr3IBwtZbdC-38v0oA3CYPMnzDrXWVJ&ll=",
        Bangalore : "https://www.google.com/maps/d/viewer?mid=14EwugpGhHhBsjwrKdAgYX172hWxF2OhD&ll=",
        Hyderabad : "https://www.google.com/maps/d/viewer?mid=13pQsZZh5sp4_6ZLylI6R5X3CQa4mAGRj&ll=",
        Kolkata : "https://www.google.com/maps/d/viewer?mid=1xxocRyzno76gbmT0r5vUGWpc2F4KX9xx&ll=",
        Noida : "https://www.google.com/maps/d/viewer?mid=1ZdvbaHIkEzBfmYnuWMO8OxNnYz-ppqTP&ll=",
        Gurgaon : "https://www.google.com/maps/d/viewer?mid=1k1gSHIy04-5r8bWzlsmZ4e1iV4NnUojv&ll=",
        Chennai : "https://www.google.com/maps/d/viewer?mid=1AJWM1rm3ote4WryvB6gJbKgK0-R-x8Kd&ll="
    }
    var spcificurl = mapurl[city]
    if(city=="Delhi"){
        city = "New Delhi";
    }
    if(city=="Navimumbai"){
        city = "Navi Mumbai";
    }
    var query = "Select * from INSTITUTIONS where city_name like \"%"+city+"%\""
    var query2 = "SELECT i.institute_name,i.student_enrollment_count, count(distinct(ep.id)) as ep_id, GROUP_CONCAT(distinct(ep.address_locality)) as groupc,ROUND(AVG(ep.formatted_price),0) as AVG_PRICING,i.latitude,i.longitude,i.url from locator.INSTITUTIONS i inner join locator.EXISTING_PROPERTIES ep on i.city_name = ep.address_region where i.city_name = \'" +city +"\' and (6371 * 2 * ASIN(SQRT(POWER(SIN((i.latitude - abs(ep.latitude)) * pi()/180 / 2),2) + COS(i.latitude * pi()/180 ) * COS(abs(ep.latitude) *pi()/180) * POWER(SIN((i.longitude - ep.longitude) *pi()/180 / 2), 2) ))) <= 3 GROUP by i.id order by i.student_enrollment_count desc limit 20;"
    var query3 = "SELECT i.city_name, COUNT(DISTINCT(i.id)) as num_institutions, COUNT(DISTINCT(ep.id)) as num_properties from locator.INSTITUTIONS i LEFT JOIN locator.EXISTING_PROPERTIES ep on i.city_name = ep.address_region WHERE i.city_name =\'" +city +"\' GROUP by i.city_name ORDER BY COUNT(i.id) desc;"
    var totalroomquery = "SELECT sum(ep2.room_count) as total_rooms from locator.EXISTING_PROPERTIES ep2 where ep2.address_region =\'" + city +"\';"
    var result2;
    con.query(query3,function(err,result2,feilds){
        if(err) throw err;
        console.log(result2);
        con.query(totalroomquery,function(err,totalroom){
            console.log(totalroom);
            con.query(query2,function(err,result,feilds){
                if(err) throw err;
                console.log(result)
                res.render("table.ejs",{insti_list:result,url:spcificurl,numbers:result2,totalroom:totalroom});
            });
        })
        
    })    
});

app.post("/viewestatetable",function(req,res){
    var city = (req.body.city2)
    var i;
    for(i = city.length-1; ;i--){
        if(city[i]=='>'){
            break;
        }
    }
    i++;
    city = city.substring(i);
    city = city.charAt(0).toUpperCase() + city.slice(1)
    console.log(city);
    var mapurl = {
        Navimumbai : "https://www.google.com/maps/d/u/0/embed?mid=18zvTSJJfkNqfE-szAo3kPYlpyATvC7q4&ll=",
        Mumbai : "https://www.google.com/maps/d/u/0/embed?mid=1ZdVy2DWblS_c2qLIS2UFd0il53u6X9Dg&ll=",
        Delhi : "https://www.google.com/maps/d/u/0/embed?mid=11A2Zz1abR_f1vihblNR5RJ7nF-ydJJH1&ll=",
        Pune : "https://www.google.com/maps/d/u/0/embed?mid=19pr3IBwtZbdC-38v0oA3CYPMnzDrXWVJ&ll=",
        Bangalore : "https://www.google.com/maps/d/u/0/embed?mid=14EwugpGhHhBsjwrKdAgYX172hWxF2OhD&ll=",
        Hyderabad : "https://www.google.com/maps/d/u/0/embed?mid=13pQsZZh5sp4_6ZLylI6R5X3CQa4mAGRj&ll=",
        Kolkata : "https://www.google.com/maps/d/u/0/embed?mid=1xxocRyzno76gbmT0r5vUGWpc2F4KX9xx&ll=",
        Noida : "https://www.google.com/maps/d/u/0/embed?mid=1ZdvbaHIkEzBfmYnuWMO8OxNnYz-ppqTP&ll=",
        Gurgaon : "https://www.google.com/maps/d/u/0/embed?mid=1k1gSHIy04-5r8bWzlsmZ4e1iV4NnUojv&ll=",
        Chennai : "https://www.google.com/maps/d/u/0/embed?mid=1AJWM1rm3ote4WryvB6gJbKgK0-R-x8Kd&ll="
    }
    var spcificurl = mapurl[city]
    if(city=="Delhi"){
        city = "New Delhi";
    }
    if(city=="Navimumbai"){
        city = "Navi Mumbai";
    }
    var lat = req.body.lat;
    var long = req.body.long;
    spcificurl = spcificurl + (req.body.lat) + "%2C" + (req.body.long) + "&z=15"
    console.log(typeof(req.body.lat))
    console.log(spcificurl)

    var q1 = "SELECT count(i.id) as NEARBY_INSTITUTIONS, sum(i.student_enrollment_count) as TOTAL_STUDENTS from locator.INSTITUTIONS i where i.city_name = \'" +city +"\' and (6371 * 2 * ASIN(SQRT(POWER(SIN((" + lat + " - abs(i.latitude)) * pi()/180 / 2),2) + COS(" + lat + "* pi()/180 ) * COS(abs(i.latitude) *pi()/180) * POWER(SIN((" + long + " - i.longitude) *pi()/180 / 2), 2) ))) <= 3;"
    con.query(q1,function(err,r1){
        if(err) throw err
        console.log(r1);
        var q2 = "SELECT count(ep.id) as NEARBY_PG, sum(ep.room_count) as TOTAL_ROOMS, ROUND(AVG(formatted_price),0) as AVG_PG_PRICING from locator.EXISTING_PROPERTIES ep where ep.address_region = \'" +city +"\' and (6371 * 2 * ASIN(SQRT(POWER(SIN((" + lat + " - abs(ep.latitude)) * pi()/180 / 2),2) + COS(" + lat + "* pi()/180 ) * COS(abs(ep.latitude) *pi()/180) * POWER(SIN((" + long + " - ep.longitude) *pi()/180 / 2), 2) ))) <= 3; "
        con.query(q2,function(err,r2){
            if(err) throw err
            console.log(r2);
            var q3 = "SELECT count(rp.id) as NEARBY_RENTAL_PLACES, sum(rp.NUMBER_OF_ROOMS) as TOTAL_RENTAL_ROOMS, ROUND(AVG(rp.RENT/rp.NUMBER_OF_ROOMS),0) as AVG_RENTAL_PRICING from locator.RENTAL_PROPERTIES_MB rp where rp.CITY = \'" +city +"\' and (6371 * 2 * ASIN(SQRT(POWER(SIN((" + lat + " - abs(rp.latitude)) * pi()/180 / 2),2) + COS(" + lat + " * pi()/180 ) * COS(abs(rp.latitude) *pi()/180) * POWER(SIN((" + long + " - rp.longitude) *   pi()/180 / 2), 2) ))) <= 3;"
            con.query(q3,function(err,r3){
                if(err) throw err
                console.log(r3)
                var q4 = "select institute_name,student_enrollment_count,ROUND((6371 * 2 * ASIN(SQRT(POWER(SIN((" + lat + " - abs(i.latitude)) * pi()/180 / 2),2) + COS(" + lat + " * pi()/180 ) * COS(abs(i.latitude) *pi()/180) * POWER(SIN((" + long + " - i.longitude) * pi()/180 / 2), 2) ))),2) as INSTI_DISTANCE from locator.INSTITUTIONS as i where i.city_name = \'" +city +"\'  and (6371 * 2 * ASIN(SQRT(POWER(SIN((" + lat + " - abs(i.latitude)) * pi()/180 / 2),2) + COS(" + lat + " * pi()/180 ) * COS(abs(i.latitude) *pi()/180) * POWER(SIN((" + long + " - i.longitude) *pi()/180 / 2), 2) ))) <= 3 ORDER BY INSTI_DISTANCE ASC;"
                con.query(q4,function(err,r4){
                    if(err) throw err
                    console.log(r4);
                    q5 = "SELECT ep.address,ROUND(AVG((6371 * 2 * ASIN(SQRT(POWER(SIN((" + lat + " - abs(ep.latitude)) * pi()/180 / 2),2) + COS(" + lat + " * pi()/180 ) * COS(abs(ep.latitude) *pi()/180) * POWER(SIN((" + long + " - ep.longitude) *pi()/180 / 2), 2) )))),2) as distance, ROUND(AVG(ep.formatted_price),0) as PG_RENTAL FROM locator.EXISTING_PROPERTIES ep WHERE address_region = \'" +city +"\'  and (6371 * 2 * ASIN(SQRT(POWER(SIN((" + lat + " - abs(ep.latitude)) * pi()/180 / 2),2) + COS(" + lat + " * pi()/180 ) * COS(abs(ep.latitude) *pi()/180) * POWER(SIN((" + long + " - ep.longitude) *pi()/180 / 2), 2) ))) <= 3 GROUP BY ep.address ORDER BY distance ASC;"
                    con.query(q5,function(err,r5){
                        if(err) throw err
                        console.log(r5);
                        q6= "SELECT rp.BHK, COUNT(DISTINCT(rp.id)) as NUM_PROPERTIES, ROUND(AVG(rp.SUPER_AREA),0) as AVG_SUPER_AREA, ROUND(AVG(rp.RENT),0) as AVG_RENT, ROUND(AVG(rp.RENT/rp.SUPER_AREA),0) as AVG_RENTALPERSQFT, ROUND(AVG(rp.RENT/rp.NUMBER_OF_ROOMS),0) as AVG_RENT_PER_BED from locator.RENTAL_PROPERTIES_MB rp where rp.CITY = \'" +city +"\' and (6371 * 2 * ASIN(SQRT(POWER(SIN((" + lat + " - abs(rp.latitude)) * pi()/180 / 2),2) + COS(" + lat + " * pi()/180 ) * COS(abs(rp.latitude) *pi()/180) * POWER(SIN((" + long + " - rp.longitude) *pi()/180 / 2), 2) ))) <= 3 GROUP BY rp.BHK ORDER BY AVG_RENT ASC;"
                        con.query(q6,function(err,r6){
                            if(err) throw err
                            console.log(r6); 
                            res.render("tableestate.ejs",{url:spcificurl,r1:r1,r2:r2,r3:r3,r4:r4,r5:r5,r6:r6});
                        })
                        
                    }); 
                });
            });
        });
    });
});

app.post("/viewcluster",function(req,res){
    console.log(req.body)
    var city = (req.body.city3);
    console.log(city);
    var i;
    for(i = city.length-1; ;i--){
        if(city[i]=='>'){
            break;
        }
    }
    i++;
    city = city.substring(i);
    city = city.charAt(0).toUpperCase() + city.slice(1)
    if(city=="Delhi"){
        city = "New Delhi";
    }
    if(city=="Navimumbai"){
        city = "Navi Mumbai";
    }
    console.log(city);

    var noofins = parseInt(req.body.noofins);
    var noofprop = parseInt(req.body.noofprop)
    q1 = "SELECT latitude as Lat, longitude as \"Long\" ,institute_name as InsN,student_enrollment_count as StE from locator.INSTITUTIONS where latitude is NOT NULL and city_name = \'Bangalore\' ;"
    con.query(q1,function(err,r1){
        if(err) throw err
        console.log(r1)
        q2 = "SELECT Latitude as Lat,Longitude as Lng ,Price FROM locator.Banglore_prop_cluster;"
        q2new = "SELECT latitude as Lat,longitude as Lng, formatted_price as Price FROM locator.EXISTING_PROPERTIES where address_region='Bangalore';"
        con.query(q2,function(err,r2){
            if(err) throw err
            console.log(r2)
            var childprocess = require("child_process");
            childprocess.exec('py ./cluster_ins.py '+noofins,function(err,ci,stderr){
                if(err) throw err
                console.log(ci);
                childprocess.exec('py ./cluster_prop.py '+noofprop,function(err,cp,stderr){
                    if(err) throw err
                    console.log(cp);
                    res.render("cluster.ejs",{r1:r1,r2:r2,ci:ci,cp:cp,noi:noofins,nop:noofprop});
                });
                
            });
        })
    })
});

app.post("/viewpython",function(req,res){
    var childprocess = require("child_process");
    childprocess.exec('py ./hello.py 20',function(err,stdout,stderr){
        if(err) throw err
        console.log(stdout)
        res.send(stdout)
    });                  
});

app.listen('3000',function(){
    console.log("Server Has Started");
})