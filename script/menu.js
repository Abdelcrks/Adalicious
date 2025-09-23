
const params = new URLSearchParams(location.search)
const name = params.get('n')

document.getElementById("name-user").textContent = `Bonjour ${name}`

const fetchMenu = async () => {
    try {
        const response = await fetch(`http://localhost:3000/menu`);
        const menus =  await response.json()


        console.log(menus)      

        
        menus.forEach(item => {
             showMenu(item)
        });
       

    } catch (error) {
        console.log("erreur", error)
    }
}

fetchMenu()


const sectionMenu = document.getElementById("section-menu")
console.log(sectionMenu)

const showMenu = (item) => {

    const div = document.createElement("div")
    sectionMenu.appendChild(div)
    div.classList.add("div-container")

    const divMenu = document.createElement("div")
    div.appendChild(divMenu)
    divMenu.classList.add("div-menu")

    const name = document.createElement("p")
    name.classList.add("name-plate")
    name.textContent = item.plate

    const description = document.createElement("p")
    description.classList.add("description")
    description.textContent = item.description

    const img = document.createElement("p")
    img.classList.add("img")
    img.textContent = item.image

    const btn = document.createElement("button")
    btn.classList.add("btn")
    btn.textContent= "Commander"

    btn.dataset.menuName = item.plate
    btn.dataset.menuImg = item.image

    btn.addEventListener('click', (e) => {
    e.preventDefault();

    commanderPlat(item)

    const queryString = new URLSearchParams(location.search)
    queryString.set("menuName", btn.dataset.menuName)
    queryString.set("menuImg", btn.dataset.menuImg)
    

    window.location.href = `preparation.html?${queryString.toString()}`;
  });

    divMenu.append(name,description,img,btn)
    
}



async function commanderPlat(item) {  
    try {    
        const resp = await fetch("http://localhost:3000/orders", {      
            method: "POST",      
            headers: { "Content-Type": "application/json" },      
            body: JSON.stringify({        
            id: item.id,        
            plate: item.plate,        
            clientName: name,      
            }),    
            });
        const data = await resp.json();    
        if (!data.ok) throw new Error(data.error);
        alert(`✅ ${data.message}`);  } 
        catch (e) 
        {    
        alert("❌ Impossible d'envoyer la commande.");    
        console.error(e);  }
        }
