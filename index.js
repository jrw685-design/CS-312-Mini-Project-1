import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
let blogPosts = [];
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
app.get("/", (req, res) => {
    
    console.log(blogPosts);
    res.sendFile(__dirname + "/public/styles1.css");
    res.render(__dirname + "/home.ejs", {
        blogList: blogPosts
    });
});
app.post("/createblog", (req, res) => {
    
    res.sendFile(__dirname + "/public/styles2.css");
    res.render(__dirname + "/create.ejs", {
        blogList: blogPosts
    });
});
app.post("/postblog", (req, res) => {

    const day = new Date();
    blogPosts[blogPosts.length] = {title: req.body["b-title"], author: req.body["b-author"], date: day, content: req.body["b-content"]};
    res.redirect("/");
    
});
app.post("/edblog", (req, res) => {

    
    
    res.sendFile(__dirname + "/public/styles2.css");
    res.render(__dirname + "/edit.ejs", {
        blogList: blogPosts,
        thisBlog: blogPosts[req.body["bindex"]],
        blogIndex: req.body["bindex"]
    });
    
});
app.post("/saveblog", (req, res) => {

    
    blogPosts[req.body["saveindex"]] = {title: req.body["b-title"], author: req.body["b-author"], date: blogPosts[req.body["saveindex"]].date, content: req.body["b-content"]};
    res.redirect("/");
    
});
app.post("/delblog", (req, res) => {

    
    removePost(req.body["delbutton"]);
    res.redirect("/");
    
});
app.listen(port, () => {
    console.log('Server running on port ' + port);
});


function removePost(blogid)
{
    
    console.log(blogPosts[blogid].title);
    if (blogPosts.length > 1)
    
    
    {
        for (var i = blogid; i < blogPosts.length - 2; i++)
        {
            var j = i + 1;
            blogPosts[i].title = blogPosts[j].title;
            blogPosts.author[i] = blogPosts.author[j];
            blogPosts.date[i] = blogPosts.date[j];
            blogPosts.content[i] = blogPosts.content[j];
        }
        blogPosts.length -= 1;
    }
    else
    {
        blogPosts = [];
    }
    console.log("done");
}