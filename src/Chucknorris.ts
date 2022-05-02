import axios from "axios";

async function main(){
    const categorylist = (await axios.get("https://api.chucknorris.io/jokes/categories")).data;
    for(let i=1; i<6; i++){
    const random = Math.floor(Math.random() * categorylist.length);
    const jokes=(await axios.get("https://api.chucknorris.io/jokes/random?category="+ categorylist[random])).data;
    console.log("Random joke number"+i+"from category"+ categorylist[random]+":"+
    jokes.value.replaceAll("chuck", "Eduardo").replaceAll("Norris", "Burgos"));
    categorylist.splice(random, 1);
    }
}
main().catch((error)=>{
    console.log(error);
})