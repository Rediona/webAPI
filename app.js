const express  = require('express')
var cors = require('cors')


const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser') // middleware that helps handle requests easier

app.use(bodyParser.urlencoded({extended: false}))
//serve static files
app.use(express.static('./public'))

app.use(morgan('combined'))
//app.use(morgan('combined')) //for more log info
app.use(cors())



const router = require('./routes/user.js') //declare new variable router as instance of router function in given folder/path
app.use(router)


//specify the root route for application server with get. In get specify route and how to handle the request with callback function. In callback
//function specify two parameters, request an response
app.get("/",(req, res) =>{
    //here specify how i want to respond  to request, eg print message
    console.log("Responding to root route")
    res.send("Hello from root")
    
})


const PORT = process.env.PORT || 3003 //και βαζω και το PORT στο listen

//to start up the application server : call listen function, specify port to listen on, and a callback function
//localhost:PORT
app.listen(PORT, () => {
    console.log("Server is up and listening on " + PORT)
})


//για εχω το log του server, δηλαδη να μου λεει καθε φορα τα request μου και ποση ωρα εγινε process κλπ
//κανω install το morgan ως dependency για το project μου 

//το path του npm folder ειναι C:\Users\redi\AppData\Roaming\npm

//οι εντολες για να τρεχει με το nodemon αυτοματα το npx nodemon app.js, και δε ξερω γτ, μαλλον για να τρεχει ως administrator 


//2ο βιντεο :connect to mysql και να μπορουμε να χρησιμοποιουμε παραμετρους οπως το id και οχι το route, για να φερνουμε καταχωρησεις