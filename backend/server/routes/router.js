const express = require('express'); 
const router  =  express.Router();    
const usable = require('../controller/controller'); 
// router.get('/', (req , res,next)=>{   
//       console.log("App"); 
//       res.render('index'); 
// })
router.get('/api/v1/openai/:id' , async (req , res , next)=>{   
      console.log("api");   
       const t = await usable.openAI(req.params);   
       console.log(t, "here at api"); 
       res.status(200).send({message: t});
}) ;  
router.post('/api/v1/form-data' , usable.OpenAiV2)
// router.get('/application' , (req , res , next)=>{   
//       console.log("here") ; 
//         const  ele1  = "eg_Carbon/C" ; 
//         const  ele2 =  "eg_Nitrogen/N" ; 
//         const  ele3  = "eg_Oxygen/O" ;      
//         res.render('application', {mutate:"", ele1 , ele2 , ele3}); 
// }) ;   
module.exports = router ; 