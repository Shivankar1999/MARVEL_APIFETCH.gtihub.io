
let Div = document.querySelector('.folders');
let AlldataR = document.querySelector('#ClearAll');

class Hero{
    constructor(name,imgUrl,power,id){
        this.name = name;
        this.imgUrl = imgUrl;
        this.power = power;
        this.id  =id;
    };

    static getHero(){
          return JSON.parse(localStorage.getItem('Heros'))
          
    };
    static DeleteHero(){

    };
  static displayUI(name,add,power,id){
        let SmallD = document.createElement('div');
        SmallD.classList.add('folder')
        SmallD.innerHTML = `
                <h3>${name} <span class ='Id'> ${id}</span></h3>
                <div class="imgbox">
                 <img src = '${add}'/>
                </div>
                <p> Power ${power}</>
                <button class="remove">Remove From Favourite</button>
        `
        Div.appendChild(SmallD);
    }

}

let Get_Storage = Hero.getHero();
// console.log(Get_Storage);

Get_Storage.forEach((element,i) => {
    let obj = new Hero(element.name,element.image.url,element.powerstats.power,element.id);
    // console.log(obj);

    Hero.displayUI(obj.name,obj.imgUrl,obj.power,obj.id);

});
AlldataR.addEventListener('click',(e) =>{
    e.preventDefault()
    localStorage.clear()
    Div.innerHTML = '';
    alert('Files Removed');
})

Div.addEventListener('click',(e) =>{
    
    if(e.target.classList.contains('remove')){
       
        let GetIDRemove =  e.target.parentElement.parentElement.children[0].children[0].innerText;
        
        let store = JSON.parse(localStorage.getItem('Heros'));
        // console.log(store);
       store.forEach((hero,i) =>{
           
             if(hero.id == GetIDRemove ){
                store.splice(i,1)
                // Remove from ui
                e.target.parentElement.parentElement.remove()
                
                // console.log(localStorage);
                alert('Item Removed');
                // break;
           
            }
            localStorage.setItem('Heros',JSON.stringify(store));
        })
       }
})