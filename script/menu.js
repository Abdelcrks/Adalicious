
const params = new URLSearchParams(location.search)
const name = params.get('n')
const currentUserId = Number(params.get("user_id"));



console.log("[menus] user_id reçu:", currentUserId, "name:", name);

// if (!currentUserId || Number.isNaN(currentUserId)) {
//   alert("Utilisateur introuvable (user_id manquant). Retour à l'accueil.");
//   location.href = "../index.html";
// }




document.getElementById("name-user").textContent = `Bonjour ${name}`

const fetchMenu = async () => {
    try {
        const response = await fetch(`http://localhost:3000/menus`);
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

    const plateName = document.createElement("p")
    plateName.classList.add("name-plate")
    plateName.textContent = item.plate

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

    btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const bddOk = commanderPlat(item)
    if(!bddOk){
        return
    }
    const queryString = new URLSearchParams(location.search)
    queryString.set("menuName", btn.dataset.menuName)
    queryString.set("menuImg", btn.dataset.menuImg)

    window.location.href = `preparation.html?${queryString.toString()}`;
  });

    divMenu.append(plateName,description,img,btn)
    
}



async function commanderPlat(item) {  
    try {    
        const resp = await fetch("http://localhost:3000/orders", {      
            method: "POST",      
            headers: { "Content-Type": "application/json" },      
            body: JSON.stringify({
            user_id: currentUserId,  
            menu_id: item.menu_id
            }),    
            });
            console.log('resp ',resp)
        if (!resp.ok) throw new Error(resp.error);

        const data = await resp.json();  

        alert(`✅ ${data.message}`);  } 
        catch (e) 
        {    
        alert("❌ Impossible d'envoyer la commande.");    
        console.log('Error :', e);  }
}


