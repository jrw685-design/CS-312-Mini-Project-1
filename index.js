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
    
    if (blogid == 0)
    {
        blogPosts = [];
    }
    else
    {
        for (i = blogid; i < blogPosts.length - 1; i++)
        {
            blogPosts[i] = blogPosts[i+1];
        }
        blogPosts.length -= 1;
    }
}