
//eventlistener
document.addEventListener("DOMContentLoaded",getlatest);
document.getElementById("loadAll").addEventListener("click",loadAll);

//https://coronavirus-tracker-api.herokuapp.com/v2/latest
//https://corona.lmao.ninja/all



//functions

function getlatest(){
    let result;
    fetch('https://corona.lmao.ninja/all')
    .then(res => res.json())
    .then(data => {
        result = data;
        document.getElementById("infected").innerHTML = result.cases;
        document.getElementById("deaths").innerHTML = result.deaths;
        document.getElementById("recovered").innerHTML = result.recovered;
    }) 
}
function loadAll(){
    let output;
    document.getElementById("mytable").style.display="block";

    fetch('https://corona.lmao.ninja/countries')
    .then(res => res.json())
    .then(data => {
        data.forEach(function(res){
             output += `
            <tr>
            <th>${res.country}</th>
            <th>${res.cases}</th>
            <th>${res.deaths}</th>
            <th>${res.recovered}</th>
            <th class="bg-warning">+${res.todayCases}</th>
            <th class="bg-danger">+${res.todayDeaths}</th>
          </tr>
          `
        })
        document.getElementById("insertHere").insertAdjacentHTML("afterend",output);
    })
}

let button = document.getElementById("button");
button.addEventListener('click',function(e){
    let input = document.getElementById("Country").value;
    document.getElementById("Country").value=" ";
    fetch(`https://corona.lmao.ninja/countries/${input}`)
    .then(res => res.json())
    .then(data => {
            document.getElementById("flag").src = data.countryInfo.flag;
            document.getElementById("title").innerHTML = data.country;
            document.getElementById("modal-infected").innerHTML = data.cases;
            document.getElementById("modal-deaths").innerHTML = data.deaths;
            document.getElementById("modal-recovered").innerHTML = data.recovered;
            document.getElementById("modal-cases").innerHTML = data.todayCases;
            document.getElementById("modal-newdeaths").innerHTML = data.todayDeaths;
    })
        document.getElementById("content").style.display = "block";
})
document.getElementById("close").addEventListener("click",function(e){
    document.getElementById("content").style.display = "none";
})