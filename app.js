var express = require("express");
var app = express();
var bodyParser  = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require('method-override');
var Fashion = require("./models/fashion");
var Comment = require("./models/comment");

// declaring a host/port varaiblles
const hostname = '127.0.0.1';
const port = 3000;

mongoose.connect("mongodb://localhost/Fashions", {useNewUrlParser: true}); 
app.use(express.static(__dirname + "/public")); // css, setting the directory to the start
app.use(bodyParser.urlencoded({extended: true})); // this is needed to read the body parser
app.set("view engine", "ejs");
app.use(methodOverride('_method'));

// redirect to homepage
app.get("/", (req, res) => {
	res.render("home");
});

// This is the homepage
app.get("/index", (req, res) => {
	//get all campgrounds from db
	Fashion.find({}, (err, allFashions) => {
		if(err){
			console.log(err);
		} else {
			res.render("index", {Fashions:allFashions});
		}
	});
});

// creating a new post
app.get("/new", (req, res) => {
	res.render("new");
});

// Creating a new post
app.post("/index", (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newPost = {name: name, image:image, description:desc};

	Fashion.create(newPost, (err, newlyCreated) => {
		if (err){
			console.log("err");
		} else {
			res.redirect("/index");
		}
	});
});

// showing more information about post
app.get("/index/:id", (req, res) => {
	Fashion.findById(req.params.id, (err, foundPost) =>{
		if(err){
			console.log("hello");
		} else {
			res.render("moreInfo", {fashions: foundPost});
		}
	});
});

// edit post
app.get("/index/:id/edit", (req, res) => {
	Fashion.findById(req.params.id, (err, editPost) => {
		if(err){
			console.log(err);
		} else {
			res.render("edit", {fashions: editPost});
		}
	});
});

// updating post
app.put("/index/:id", (req, res) => {
	// find and update the correct post
	Fashion.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost) =>{
		if(err){
			console.log(err);
		} else {
			res.redirect("/index/" + req.params.id);
		}
	});
});

// deleting post
app.delete("/index/:id", (req, res) => {
	Fashion.findByIdAndRemove(req.params.id, (err) => {
		if(err){
			console.log(err);
		} else {
			res.redirect("/index");
		}
	});
});

// Creating a new comment section
app.get("/index/:id/comments/new", (req, res) => {
	Fashion.findById(req.params.id, (err, comment) => {
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {comment: comment});
		}
	});
});

// posting the comment section
app.post("/index/:id/comments", (req, res) =>{
	Fashion.findById(req.params.id, (err, fashion) => {
		if (err) {
			console.log(err);
		} else {
			
		}
	});
});



app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
  });