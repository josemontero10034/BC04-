const ip="1.coco.yautia.yuca";  //ipv4 address
const ipitems=[...ip]; // to convert like a group of items
let a=0;        //ip.split('')
let b=0;
let c=0;
let d=0;
let conteiner=0;
let eachpiece="";    // declared to divide into four pieces
let eachpiece2="";        // declared to divide into four pieces
let eachpiece3="";        // declared to divide into four pieces
let eachpiece4="";           // declared to divide into four pieces
for(let i=0; i<ipitems.length; i++){       //every bucle divide the ip adress for saving into new value [a,b,c,d]
    if(ipitems[i]=="."){
       break;
    }
    eachpiece+=ipitems[i];
    a=parseFloat(eachpiece);       //function parsefloat is used to convert string items to number items
    conteiner=i;     // the letter p is used like conteiner, saving the position where last bucled stop 
    }
for(let i2=conteiner+2; i2<ipitems.length; i2++){
    if(ipitems[i2]=="."){
       break;
    }
    eachpiece2+=ipitems[i2];
    b=parseFloat(eachpiece2);
    conteiner=i2;
    }
 for(let i3=conteiner+2; i3<ipitems.length; i3++){
    if(ipitems[i3]=="."){
       break;
    }
    eachpiece3+=ipitems[i3];
    c=parseFloat(eachpiece3);
    conteiner=i3;
    }
 for(let i4=conteiner+2; i4<ipitems.length; i4++){
    if(ipitems[i4]=="."){
       break;
    }
    eachpiece4+=ipitems[i4];
    d=parseFloat(eachpiece4);
    }
const stringtoarray=(value:string): string[]=>{  // function stringtoarray change number's value to string's value
    return [...value];
}

const numbertostring =(c:number):boolean=>{
    const firstarray=parseFloat(stringtoarray(eachpiece)[c]);
    const firstarray2=parseFloat(stringtoarray(eachpiece2)[c]);
    const firstarray3=parseFloat(stringtoarray(eachpiece3)[c]);
    const firstarray4=parseFloat(stringtoarray(eachpiece4)[c]);
    let firstcondition = true; 
   if (firstarray!==0){
     firstcondition= false;
   }
   else if (firstarray2!==0 && firstcondition==true){
     firstcondition= false;
   }
 else if (firstarray3!==0 && firstcondition==true){
     firstcondition= false;
   }
 else if (firstarray4!==0 && firstcondition==true){
     firstcondition = false;
   }
   else if (firstarray!==0 && firstcondition==true){
    firstcondition = false;
    if (firstarray!==0){
        firstcondition= false;
        if (firstarray2!==0){
            firstcondition= true;
          }
      }
  }
   return firstcondition;
}
let limitnumber=true;
switch (limitnumber){
    case (a<=255 && a>0):{
        limitnumber=false;
    }
     case (b<=255 && b>0):{
        limitnumber=false;
    }
     case (c<=255 && c>0):{
        limitnumber=false;
    }
     case (d<=255 && d>0):{
        limitnumber=false;
    }
    default:{
        break;
    }
}
let ipvalid= numbertostring(0);
let ipvalid2= limitnumber;
if(ipvalid===true && ipvalid2===true ){
    console.log ('la direccion ipv4 : '+ ip+' es invalida ');          // when a,b,c and d is equal NaN, suchs values are true;

}
else if(ipvalid===true && ipvalid2===false){
    console.log ('la direccion ipv4 : '+ ip+' es invalida ');
}
else if(ipvalid===false && ipvalid2===true){
    console.log ('la direccion ipv4 : '+ ip+' es invalida ');                   
}                            
else{                                       
    console.log ('la direccion ipv4 : '+ ip+' es valida '); 
    console.log (ipvalid); 
    console.log (ipvalid2);
    console.log (eachpiece);                  
}
