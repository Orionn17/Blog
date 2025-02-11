import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", (req,res) => {
    res.render("index.ejs", {
        posts: posts,
    })
});

app.get("/open/:id", (req,res) => {
    const postId = req.params.id;
    const post = posts[postId];
    res.render('open.ejs', { post, postId });
});

app.get("/edit/:id", (req,res) => {
    const postId = req.params.id;
    const post = posts[postId];
    res.render('edit.ejs', { post, postId });
});

app.get("/new", (req,res) => {
    res.render("new.ejs")
});

app.post("/new", (req, res) => {
    const newPost ={
        title : req.body.title,
        content : req.body.content,
    }

    posts.push(newPost);
    res.redirect("/");
})

app.post("/edit/:id", (req, res) => {
    const postId = req.params.id;
    posts[postId].title = req.body.title;
    posts[postId].content = req.body.content;
    res.redirect('/');
})

app.post('/delete/:id', (req, res) => {
    const postId = req.params.id;
    posts.splice(postId, 1); 
    res.redirect('/'); 
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});