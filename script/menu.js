
const params = new URLSearchParams(location.search)
const n = params.get('n')

document.getElementById("name-user").textContent = `Bonjour ${n}`

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

    const btn = document.createElement("btn")
    btn.classList.add("btn")
    btn.textContent= "Commander"
    btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `preparation.html?n=${encodeURIComponent(n)}`;
  });

    divMenu.append(name,description,img,btn)
    
}



