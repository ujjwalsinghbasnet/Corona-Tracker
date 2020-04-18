
//eventlistener
document.addEventListener("DOMContentLoaded",getlatest);
document.getElementById("loadAll").addEventListener("click",loadAll);

//https://coronavirus-tracker-api.herokuapp.com/v2/latest
//https://corona.lmao.ninja/all



//functions

function getlatest(){
    let result;
    fetch('https://corona.lmao.ninja/v2/all')
    .then(res => res.json())
    .then(data => {
        result = data;
        document.getElementById("infected").innerHTML = result.cases;
        document.getElementById("deaths").innerHTML = result.deaths;
        document.getElementById("recovered").innerHTML = result.recovered;
    })
    .catch(err => alert('Please check your connection!'))
}
function loadAll(){
    let output = "";
    document.getElementById("mytable").style.display="block";

    fetch('https://corona.lmao.ninja/v2/countries')
    .then(res => res.json())
    .then(data => {
        data.forEach(function(results){
             output += `<tr>
            <th class="text-left">${results.country}</th>
            <th class="text-left">${results.cases}</th>
            <th class="text-left">${results.deaths}</th>
            <th class="text-left">${results.active}</th>
            <th class="text-left">${results.recovered}</th>
            <th class="bg-warning text-left">+${results.todayCases}</th>
            <th class="bg-danger text-left">+${results.todayDeaths}</th>
          </tr>
          `
        })
        document.getElementById("insertHere").innerHTML = output;
    })
}

let button = document.getElementById("button");
button.addEventListener('click',loadCountry)

const form = document.getElementById("form");
form.onsubmit = e => {
  e.preventDefault();
  let input = document.getElementById("Country").value;
  loadCountry();
};


function loadCountry(){

    let input = document.getElementById("Country").value;
    document.getElementById("Country").value=" ";
    fetch(`https://corona.lmao.ninja/v2/countries/${input}`)
    .then(res => res.json())
    .then(data => {
            document.getElementById("flag").src = data.countryInfo.flag;
            document.getElementById("title").innerHTML = data.country;
            document.getElementById("modal-infected").innerHTML = data.cases;
            document.getElementById("modal-deaths").innerHTML = data.deaths;
            document.getElementById("modal-recovered").innerHTML = data.recovered;
            document.getElementById("modal-cases").innerHTML = data.todayCases;
            document.getElementById("modal-newdeaths").innerHTML = data.todayDeaths;
            document.getElementById("modal-active").innerHTML = data.active;
    })
        document.getElementById("content").style.display = "block";
}
document.getElementById("close").addEventListener("click",function(e){
    document.getElementById("content").style.display = "none";
})
document.getElementById("close2").addEventListener("click",function(e){
    document.getElementById("content").style.display = "none";
})

