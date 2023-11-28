const express = require("express");
const { urlencoded } = require("express");

// install the version 3.2.1 to get this work.
const {Configuration, OpenAIApi} = require("openai");

const app = express();

const configuration = new Configuration({
    apiKey: "Your own API key from OpenAI",
});
const openai = new OpenAIApi(configuration);


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    ); 
    next();
  });
  
  app.use(urlencoded({ extended: true }));
  app.use(express.json({ extended: true }));

  async function images(prompt) {
    try {
      const response = await openai.createImage({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
  
      const imageUrl = response.data.data[0].url; 
      console.log(imageUrl); 
  
      return imageUrl;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }
  

  

  app.post("/generateImage", async (req,res) => {
    try {
      const image = await images(req.body.prompt);
      res.send({image})
    } catch (error) {
      console.log(error)
    }
   
  })


  app.listen(process.env.PORT || 3000, () => {
    console.log("app listening on port  3000");
  });
  