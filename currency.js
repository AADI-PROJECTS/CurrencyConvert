const selectdrop=document.querySelectorAll(".base select");
var myHeaders = new Headers();
myHeaders.append("apikey", "5udE8kbJ9l6NdKxLSauudJgb38zU8U8f");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
const url="https://api.apilayer.com/exchangerates_data/latest";

document.addEventListener("DOMContentLoaded",()=>{
    let dataLoaded = false;
    const starttime = new Date().getTime();
    Updatedata().then(() => {
      dataLoaded = true;
    });
    setTimeout(()=>{
        const endtime = new Date().getTime();
        const timetake = endtime - starttime;
        if(timetake > 4000 && !dataLoaded){
          alert("Internet was slow");
        }
    },4000)
});
for(let i of selectdrop){
    for(let j in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=j;
        newoption.value=j;
        //default select
        if(i.name==="first" && j==="USD"){
            newoption.selected="selected";
        }
        else if(i.name ==="second" && j ==="INR"){
            newoption.selected="selected";
         }
        i.append(newoption);
    }
    i.addEventListener("change",(e) =>{
        updateflag(e.target);
   });
}
const updateflag =(ele)=>
    {
    let code=ele.value;
    let newcode=countryList[code];
    let newsrc=`https://flagsapi.com/${newcode}/shiny/64.png`;
    let oldsrc=ele.parentElement.querySelector("img");
    oldsrc.src=newsrc;
}

let btn=document.querySelector(".button");
const fromvalue=document.querySelector("#flagfrom");
const tovalue=document.querySelector("#flagto");
let msg=document.querySelector(".Rate");
btn.addEventListener("click",(evt)=>{
   evt.preventDefault();
   Updatedata();
});

const Updatedata = async ()=>{
    let amount=document.querySelector(".amount");
   if(amount.value==="" || amount.value < 1){
       amount.value=1;
       amount.value="1";
    }
    
  const parma=new URLSearchParams({
    base :fromvalue.value,
    Symbol:tovalue.value,
    amount:amount.value
  });
  const fullurl=`${url}?${parma.toString()}`;
  let rep=await fetch(fullurl,requestOptions);
  let data=await rep.json();
  let rate =data.rates[tovalue.value];
  let finalvalue=amount.value * rate;
  console.log(finalvalue);
  msg.innerText=`${amount.value}${fromvalue.value} = ${finalvalue} ${tovalue.value}`;
  console.log(finalvalue);
}