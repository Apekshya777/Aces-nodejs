
require("dotenv").config()
const express = require("express")
const connectToDb = require("./database/databaseConnection")
const Blog = require("./model/blogModel")
const bcrypt = require('bcrypt')
const app = express() 
// const multer = require("./middleware/multerConfig").multer
// const storage = require("./middleware/multerConfig").storage
<<<<<<< HEAD
const cookieParser=require("cookie-parser")
=======
const cookieParser = require('cookie-parser')

>>>>>>> c762795eda0be1f0fc959d701f9c3326f2d0222f
app.use(cookieParser())

const {multer,storage} = require('./middleware/multerConfig') 
const User = require("./model/userModel")
const upload = multer({storage : storage})
const jwt = require("jsonwebtoken")
const isAuthenticated = require("./middleware/isAuthenticated")

connectToDb()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.set('view engine','ejs')

app.get("/", async (req,res)=>{
    const blogs = await Blog.find() // always returns arrray 
    res.render("./blog/home",{blogs})
})

<<<<<<< HEAD
app.get("/about",(req,res)=>{
    const name = "apekshaparajuli"
    res.render("about.ejs",{name})
})
app.get("/createblog",isAuthenticated,(req,res)=>{
=======
app.get("/about",isAuthenticated, (req,res)=>{
    const name = "Manish Basnet"
    res.render("about.ejs",{name})
})
app.get("/createblog",isAuthenticated, (req,res)=>{
>>>>>>> c762795eda0be1f0fc959d701f9c3326f2d0222f
    console.log(req.userId)
    res.render("./blog/createBlog")
})

app.post("/createblog",upload.single('image') ,async (req,res)=>{
    // const title = req.body.title 
    // const subtitle = req.body.subtitle 
    // const description  = req.body.description 
    const fileName = req.file.filename
    const {title,subtitle,description} = req.body 
    console.log(title,subtitle,description)

   await Blog.create({
        title, 
        subtitle , 
        description, 
        image : fileName
    })

    res.send("Blog created successfully")
})

app.get("/blog/:id",async (req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id)
    res.render("./blog/singleBlog",{blog})
})

app.get("/deleteblog/:id",async (req,res)=>{
    const id = req.params.id 
    await Blog.findByIdAndDelete(id)
    res.redirect("/")
})


app.get("/editblog/:id",async (req,res)=>{
    const id = req.params.id
    // const {id} = req.params 
  const blog =   await Blog.findById(id) 
    res.render("./blog/editBlog",{blog})
})

app.post("/editblog/:id",async (req,res)=>{
    const id = req.params.id 
    const {title,subtitle,description} = req.body 
    await Blog.findByIdAndUpdate(id,{
        title : title, 
        subtitle : subtitle, 
        description : description
    })
    res.redirect("/blog/" + id)
})

app.get("/register",(req,res)=>{
    res.render("./authentication/register")
})
app.get("/login",(req,res)=>{
    res.render("./authentication/login")
})

app.post("/register",async (req,res)=>{
    const {username,email,password} = req.body 
   await User.create({
        username : username, 
        email : email, 
        password : bcrypt.hashSync(password,12)
    })
    res.redirect("/login")
})


app.post("/login",async (req,res)=>{
    const {email,password} = req.body 
  const user = await User.find({email : email})

  if(user.length
     === 0){
    res.send("Invalid email")
  }else{
    // check password now 
    const isMatched = bcrypt.compareSync(password,user[0].password)
    if(!isMatched){
        res.send("Invalid password")
    }else{
<<<<<<< HEAD
        const token=Jwt.sign({userId: user[0]._id},process.env.SECRET, {
            expireIn:'20d'
                    })
                    
                
                    res.cookie("token",token)
                    res.send("logged in successfully")
                }
            }
            
            
=======
        // require("dotenv").config()
        
        const token = jwt.sign({userId : user[0]._id},process.env.SECRET,{
            expiresIn : '20d'
        })
        res.cookie("token",token)
        res.send("logged in successfully")
    }
  }

>>>>>>> c762795eda0be1f0fc959d701f9c3326f2d0222f
})
function isAuthenticated(req, res, next) {
    // Your authentication logic here
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.use(express.static("./storage"))
app.use(express.static("./public"))

app.listen(3000,()=>{
    console.log("Nodejs project has started at port" + 3000)
})





