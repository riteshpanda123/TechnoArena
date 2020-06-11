var express = require("express");
var router = express.Router();
var moment = require('moment');

const Posts = require('../models/posts');
const DevData = require('../models/devicedata');

//LANDING ROUTE
router.get("/", function(req, res){
	res.render("mainpage");	
});

router.get("/aboutus", function(req, res){
	res.render("aboutus");
});

router.get("/latestnews/new", isLoggedIn, function(req,res){
	res.render("addnews", {moment: moment});
});

router.post("/latestnews", isLoggedIn, function(req, res){
    var source = req.body.source;
	var name = req.body.name;
	var image = req.body.image;
    var desc = req.body.description;
    var date = req.body.date;
	var newObj = {name: name , image: image, description: desc, date: date, source:source};
	Posts.create(newObj, function(err,newlyobj){
	if(err){
		//console.log("Aghh error!");
		console.log(err);
	}
	else{
		//console.log("Blog added succesfully!")	
		//console.log(newlyobj);
		res.redirect("/news");
	}
	});
});

//News Page

router.get("/news", function(req,res){
    Posts.find({}).sort('-date').exec(function(err, posts){
        if(err){
            console.log(err);
        }
        else{
            res.render("newspage",{posts:posts});
        }
    });
});

//Display page of news

router.get("/news/:id", isLoggedIn, function(req,res){
	Promise.all([
		Posts.findById(req.params.id),
		Posts.find({}).sort('-date')
	]).then(([posts,news])=>{
		res.render("displaypage",{posts:posts,news:news})
	});
});

//SEARCH PAGE

router.get("/search", function(req,res){
    res.render("searchhome");
});

router.post("/brand/:brand/:id", isLoggedIn, function(req,res){
    var devname = req.body.devname;
        Promise.all([
            DevData.findOne({devname:devname})
        ]).then(([device])=>{
            var id=device._id;
            var brand=device.brand;
            //console.log(id);
            res.redirect("/brand/"+brand+"/"+id);   
        });
    
    // DevData.findOne({devname:devname},function(err,devData){
    //     if(err){
    //         console.log("Aghh error!");
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Search Successful")	
    //         console.log(devData.brand);
    //         var brand=devData.brand;
    //         DevData.find({brand:brand},function(err,Brand){
    //             if(err){
    //                 console.log("Aghh error!");
    //                 console.log(err);
    //             }else{  
    //                 Console.log(brand);
    //                 res.render("searchresult",{device:devData,brand:Brand});
    //             }
    //         })
    //     }
    // })
});

router.get("/brand/:brand/:id", isLoggedIn, function(req,res){
    Promise.all([
        DevData.findById(req.params.id)
    ]).then(([device])=>{
        var brandname=device.brand;
        //console.log(brandname);
        DevData.find({brand:brandname},function(err,names){
            res.render("searchresult",{device:device,alldev:names});    
        });   
    });
});

//AUTOCOMPLETE

router.get('/autocomplete/', function(req, res, next) {

    var regex= new RegExp(req.query["term"],'i');
   
    var devFilter = DevData.find({devname:regex},{'devname':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(10);
    devFilter.exec(function(err,data){
  
  var result=[];
  if(!err){
     if(data && data.length && data.length>0){
       data.forEach(user=>{
         let obj={
           id:user._id,
           label: user.devname
         };
         result.push(obj);
       });
  
     }
   
     res.jsonp(result);
  }
  
    });
  
  });
  

//Featured Brands Routes
router.get("/brand/OnePlus", isLoggedIn, function(req,res){
    Promise.all([
        DevData.find({brand:"OnePlus"}),
        Posts.find({})
    ]).then(([brand,news])=>{
            var brandimg={brandimage:"https://firebasestorage.googleapis.com/v0/b/technoarenamobile.appspot.com/o/WebsiteAssets%2FBrand%20Images%2FOnePlus.png?alt=media&token=586a43db-8533-4e46-a470-29926313ca2a"};
            res.render("brandpage",{branddata:brand,news:news,brand,image:brandimg});       
    });
});

router.get("/brand/Xiaomi", isLoggedIn, function(req,res){
    Promise.all([
        DevData.find({brand:"Xiaomi"}),
        Posts.find({})
    ]).then(([brand,news])=>{
            var brandimg={brandimage:"https://firebasestorage.googleapis.com/v0/b/technoarenamobile.appspot.com/o/WebsiteAssets%2FBrand%20Images%2FXiaomi.png?alt=media&token=9616cc8c-eac7-4d2a-9a81-9df45dd2a4ea"};
            res.render("brandpage",{branddata:brand,news:news,image:brandimg});       
    });
});

router.get("/brand/IPhone", isLoggedIn, function(req,res){
    Promise.all([
        DevData.find({brand:"iPhone"}),
        Posts.find({})
    ]).then(([brand,news])=>{
            var brandimg={brandimage:"https://firebasestorage.googleapis.com/v0/b/technoarenamobile.appspot.com/o/WebsiteAssets%2FBrand%20Images%2FiPhone.png?alt=media&token=65dadefe-c955-456e-af45-1c6a39ecf398"};
            res.render("brandpage",{branddata:brand,news:news,image:brandimg});       
    });
});

router.get("/brand/Huawei", isLoggedIn, function(req,res){
    Promise.all([
        DevData.find({brand:"Huawei"}),
        Posts.find({})
    ]).then(([brand,news])=>{
            var brandimg={brandimage:"https://firebasestorage.googleapis.com/v0/b/technoarenamobile.appspot.com/o/WebsiteAssets%2FBrand%20Images%2FHuawei.png?alt=media&token=8001bb9d-b4e6-4784-861b-e9f37f5d85ec"};
            res.render("brandpage",{branddata:brand,news:news,image:brandimg});       
    });
});

router.get("/brand/Samsung", isLoggedIn, function(req,res){
    Promise.all([
        DevData.find({brand:"Samsung"}),
        Posts.find({})
    ]).then(([brand,news])=>{
            var brandimg={brandimage:"https://firebasestorage.googleapis.com/v0/b/technoarenamobile.appspot.com/o/WebsiteAssets%2FBrand%20Images%2FSamsung.png?alt=media&token=d0f2c952-f639-4c81-80c7-e33025ff433a"};
            res.render("brandpage",{branddata:brand,news:news,image:brandimg});       
    });
});

router.get("/brand/Oppo", isLoggedIn, function(req,res){
    Promise.all([
        DevData.find({brand:"Oppo"}),
        Posts.find({})
    ]).then(([brand,news])=>{
            var brandimg={brandimage:"https://firebasestorage.googleapis.com/v0/b/technoarenamobile.appspot.com/o/WebsiteAssets%2FBrand%20Images%2FOppo.png?alt=media&token=b2eb798d-04f6-43d9-8b6d-812e60bc311b"};
            res.render("brandpage",{branddata:brand,news:news,image:brandimg});       
    });
});

router.get("/brand/Asus", isLoggedIn, function(req,res){
    Promise.all([
        DevData.find({brand:"Asus"}),
        Posts.find({})
    ]).then(([brand,news])=>{
            var brandimg={brandimage:"https://firebasestorage.googleapis.com/v0/b/technoarenamobile.appspot.com/o/WebsiteAssets%2FBrand%20Images%2FAsus.png?alt=media&token=357956a7-2b38-4976-8114-04aed5b553dd"};
            res.render("brandpage",{branddata:brand,news:news,image:brandimg});       
    });
});

router.get("/brand/Realme", isLoggedIn, function(req,res){
    Promise.all([
        DevData.find({brand:"Realme"}),
        Posts.find({})
    ]).then(([brand,news])=>{
            var brandimg={brandimage:"https://firebasestorage.googleapis.com/v0/b/technoarenamobile.appspot.com/o/WebsiteAssets%2FBrand%20Images%2FRealme.png?alt=media&token=f767ed9c-33eb-4746-a15f-051872307e7c"};
            res.render("brandpage",{branddata:brand,news:news,image:brandimg});       
    });
});

router.get("/brand/Vivo", isLoggedIn, function(req,res){
    Promise.all([
        DevData.find({brand:"Vivo"}),
        Posts.find({})
    ]).then(([brand,news])=>{
            var brandimg={brandimage:"https://firebasestorage.googleapis.com/v0/b/technoarenamobile.appspot.com/o/WebsiteAssets%2FBrand%20Images%2FVivo.png?alt=media&token=0f964bee-0180-4efa-b390-9cb1e69023af"};
            res.render("brandpage",{branddata:brand,news:news,brand,image:brandimg});       
    });
});


//Authentication Middleware

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
    }
    req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
}

module.exports = router;
