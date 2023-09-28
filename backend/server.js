const express =  require('express'); 
const morgan  =  require('morgan') ;
const bodyParser  =  require('body-parser') ; 
const dotenv  =  require('dotenv');    
const path = require('path'); 
const app =  express() ;
const cors = require("cors")
app.use(cors())
app.use(morgan('tiny')) ;   
dotenv.config({path:'./config.env'});  
app.use(bodyParser.urlencoded(
    { extended : true})) ; 


const PORT = process.env.PORT || 3000 ;   

app.use('/', require('./server/routes/router'))  ; 
app.listen(PORT , () => console.log(`server listening on http://localhost:${PORT}`))


// C:\Users\Admin\AppData\Roaming\npm