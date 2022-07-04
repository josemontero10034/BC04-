import { rejects } from "assert";
import axios from "axios";
import { type } from "os";
import { resolve } from "path";
const express = require('express');
const { json } = require('express/lib/response');
const chuckapi = express();
chuckapi.use(express.json());
const port = 8080;
type print= {
  "categories":string,
  "id":any,
  "value": string
};
let database:any ={
  "student": [
      {
          "firstname":"octavio",
          "lastname" :"kidd",
          "age"      : 25
      },
      {
          "firstname":"Adhonys",
          "lastname" :"Diaz",
          "age"      : 30
      },
      {
          "firstname":"Ean",
          "lastname" :"Jimenez12345",
          "age"      : 24
      }
  ]
};

async function main()/*: Promise<print>*/ {
  const categorylist = (await axios.get("https://api.chucknorris.io/jokes/categories")).data;
const random = Math.floor(Math.random() * categorylist.length);
const jokes=(await axios.get("https://api.chucknorris.io/jokes/random?category="+ categorylist[random])).data;
console.log("Random joke number  from category "+ categorylist[random]+":"+ jokes.value.replaceAll("Chuck", "Eduardo").replaceAll("Norris", "Burgos"));
categorylist.splice(random, 1);
return jokes
/*return {
  "categories": jokes.categories,
  "id":jokes.id,
  "value":jokes.value
}*/}
chuckapi.get('/joke', async(request:any, respond:any)=>{
  const valuejoke=await main();

  //respond.json(jokemain().then(val=>val));
  //const result = jokemain().then(val=>console.log(val))
  //const resultjson = main().then((res)=>console.log(res))
 respond.send(valuejoke);
})
chuckapi.listen(port, ()=> console.log('alterna Api is running!'))

