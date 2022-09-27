const HeroForm = document.querySelector("#hero-form");
let FavHeros = [];
const Res = document.querySelector("#results");
// Show Heros

function ShowHero(Heros) {
  // Clear The results
  Res.innerHTML = "";

  // Loop to the array

  Heros.forEach((hero) => {
    // console.log(hero);
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
                    <div class='flex'>
                        <div class = 'item-flex desciption'>
                            <h4>${hero.name} <span class= 'heroId'> ${hero.id}</span></h4>
                            <p><strong> Family</strong> <br> ${hero.connections.relatives}</p>
                            </p>
                            <p> <strong>Height </strong> : ${hero.appearance.height[0]} <strong>Weight</strong>: ${hero.appearance.weight[0]}
                            </p>
                            <p>
                               [<strong>Base Of Work</strong> :${hero.work.base} ,<strong>Occupation </strong> :  ${hero.work.occupation} ]

                            </p>
                            <ul class='list-group'>
                                <li class='list-group-item'> <strong>Combat</strong> :${hero.powerstats.combat}</li>
                               
                                <li class='list-group-item'> <strong>Intelligence
                                </strong> :${hero.powerstats.intelligence}</li>
                                <li class='list-group-item'> <strong>Power</strong> :${hero.powerstats.power}</li>
                               

                            </ul>
                            <br>
                            <button class = 'btn btn-primary AddFav '> Add Favourite</button>
                            

                        </div>
                    <div class = 'item-flex img-box'>
                                <img class ='img-fluid mt-2' src='${hero.image.url}'/>
                    </div>

                    </div>
                `;
    Res.appendChild(div);

    // Get Favourite btn
  });
}

// Add a Hero to Favourite List...
function AddedFav(Heros) {

   Res.addEventListener("click", (e) => {
    if (e.target.classList.contains("AddFav")) {
      let TarHero = e.target.parentElement.children[0].children[0].innerText;
      console.log(TarHero);
      for (let hero of Heros) {
        if(hero.id === TarHero){
            FavHeros.push(hero);
            console.log(FavHeros);
            localStorage.setItem('Heros',JSON.stringify(FavHeros));
            alert(`${hero.name} is Added To Favourite..`)
            // console.log(localStorage);
            break;
        }

       
        
      }

       
      
    }
  }); 
}


// Declare Fetch Hero Api

  async function FetchHero(e) {
  e.preventDefault();
  // Fetch  User Input..
  const InVal = document.querySelector("#heros").value;
  if (InVal == "") {
    alert("Please Enter Name..");
  }
  document.querySelector("#heros").value = "";
  //  Fetch API Call
  let ResObj = await fetch(
    `https://superheroapi.com/api.php/640005060827555/search/${InVal}`
  );

  let ResProObj = await ResObj.json();
  if (ResProObj.results !== undefined) {
    ShowHero(ResProObj.results);
    AddedFav(ResProObj.results);
  } else {
    alert("Enter Valid Input");
    return;
  }
}

HeroForm.addEventListener("submit", FetchHero);
