import { rejects } from "assert";
import axios from "axios";
import { request } from "http";
import { type } from "os";
import { resolve } from "path";
import { isJsxOpeningLikeElement } from "typescript";
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

async function main():Promise<print> {
  const categorylist = (await axios.get("https://api.chucknorris.io/jokes/categories")).data;
const random = Math.floor(Math.random() * categorylist.length);
const jokes=(await axios.get("https://api.chucknorris.io/jokes/random?category="+ categorylist[random])).data;
console.log("Random joke number  from category "+ categorylist[random]+":"+ jokes.value.replaceAll("Chuck", "Eduardo").replaceAll("Norris", "Burgos"));
categorylist.splice(random, 1);
return {
  "categories":jokes.categories,
  "id":jokes.id,
  "value":jokes.value
}
}
chuckapi.get('/joke', async(request:any, respond:any)=>{
  const valuejoke=await main();
 respond.send(valuejoke);
});
chuckapi.post('/changejokes', async(request:any, respond:any)=>{
  const joke= request.body.value;
  if(!!joke){
    function changejoke(){ 
    }
  }
})
chuckapi.listen(port, ()=> console.log('alterna Api is running!'))

