const { compile } = require("morgan");
const { Configuration, OpenAIApi } = require("openai");
// const readlineSync = require("readline-sync");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });


//   "ChemMixer, I have combined elements [Element 1], [Element 2], [Element 3], and [Element 4] from the periodic table. Please provide me with information on three possible compounds that can be formed by these elements, along with their applications."
const openai = new OpenAIApi(configuration);
exports.openAI = async (ASK) => {
    
  console.log(ASK.id,"id"); 
  const history = [];
  const user_input = ASK.id;
    // if(user_input.split(" ").length == 1){ 
    //   console.log(user_input,"user_input")
    //    return user_input;
    // }
    const messages = [];
    for (const [input_text, completion_text] of history) {
      messages.push({ role: "user", content: input_text });
      messages.push({ role: "assistant", content: completion_text });
    }

    messages.push({ role: "user", content: `As chemicals expert, perform a chemical reaction to create 3 compounds out of the given list of elements in the input.  If there is no compound possible with the given input list of elements, either replace or remove any one element and perform the reaction to get compounds. and specify any 3 real world applications (1 sentence each) for each of the compound. Return the output only in the format below:

    {"compounds":["compound1","compound2","compound3"],"compound-1": ["application-1", "application-2", "application-3"] , "compound-2": ["application-1", "application-2", "application-3"] , "compound-3": ["application-1", "application-2", "application-3"]}
    
    Note: generate only the final output.
    
    Query:${user_input}
    
    ` });

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completion_text = completion.data.choices[0].message.content;
      console.log(completion_text.trim('.'));   
      if(completion_text.split() >= 3){ 
         return "Provide context"
      }
      return completion_text.trim('.') ;      
     
    } catch (error) {  
      console.log("error window") ;
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
;  
exports.OpenAiV2 = async(req , res, next)=>{ 
        const required = req.body;   
      
      
        // toModify.innerHTML = mutate;        
        
      
  const history = [];
    let mutate = "" ;   
    let ele1 = "";
    let ele2 = ""; 
    let ele3  = ""; 
    
    let messages = [];
    for (const [input_text, completion_text] of history) {
      messages.push({ role: "user", content: input_text });
      messages.push({ role: "assistant", content: completion_text });
    }
    console.log(`Give  a compund given an input list of elements. Give result sint he folllowing format : Chemical formula : COmmon name : Top 3 applications. If not ocmpund is possible then orecommend an elemnt to be removed, replaced or added to make it feasible:input compouds : ${user_input}`) ;
    messages.push({ role: "user", content: `As chemicals expert, perform a chemical reaction to create 3 compounds out of the given list of elements in the input.  If there is no compound possible with the given input list of elements, either replace or remove any one element and perform the reaction to get compounds. and specify any 3 applications of each of the compounds. Return the output only in the format below:

    Output Format: {"compound-1": ["application-1", "application-2", "application-3"] , "compound-2": ["application-1", "application-2", "application-3"] , "compound-3": ["application-1", "application-2", "application-3"]}
    
    Note: generate only the final output `  });
    
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });    
      let completion_text = completion.data.choices[0].message.content ; 
      console.log(completion_text,"completion tetx")  
      completion_text  = completion_text.replace(/^Input: /, '');  
      completion_text = completion_text.replace(/\]\[/g, "],[");  
      completion_text =  completion_text.split("Output:")
      console.log(completion_text); 
      messages = []; 
      messages.push({ role: "user", content: `extract the infromation from this input of in the format  [Chemical formula : <formula>,
        Common name : <name>,
        Applications : <applications>]  and write me with comma sperated  just return me the output not interested in input, also dont write output anywhere in the code input  where the data belongs to at the end out should looklike = {"1": {"chemical formula": "XYZ" , "common name": "XYZ" , "applications": "xyx" } , "2": {"chemical formula": "XYZ" , "common name": "XYZ" , "applications": "xyx"  }, "3": {"chemical formula": "XYZ" , "common name": "XYZ" , "applications": "xyx" }}  and do not replace the curly bracket with other brackets DO NOT MISS ANY { }
        ${completion_text}`  });
      
   
          const  completion1 = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
          });    
       completion_text = completion1.data.choices[0].message.content ;   
       console.log(completion_text);    
      //  completion_text = "["+completion_text+"]";   
       const jsonObject = JSON.parse(completion_text); 
       console.log(jsonObject["1"]);   
       ele1  = req.body.element_1  ;
       ele2 = req.body.element_2  ;
       ele3  = req.body.element_3 ;
       mutate = `<div  class = "card">  <div> ${JSON.stringify(jsonObject["1"]).trim("{").trim("}")} </div> </div>` + `<div  class = "card">  <div> ${JSON.stringify(jsonObject["2"]).trim("{").trim("}")} </div> </div>`+`<div  class = "card">  <div> ${JSON.stringify(jsonObject["3"]).trim("{").trim("}")} </div> </div>`; 
      
      console.log(completion_text);    
     
    } catch (error) {  
      console.log("error window") ;
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }

       
        res.status(200).render('application' , {mutate, ele1 , ele2 , ele3}) ; 
}