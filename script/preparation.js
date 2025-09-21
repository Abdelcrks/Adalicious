const params = new URLSearchParams(location.search)
const name = params.get("n")
const menuName = params.get("menuName")
const menuImg = params.get ("menuImg")

document.getElementById("name-user").textContent = `Merci pour ta commande ${name}`


const section = document.getElementById("section-preparation")
console.log(section)

const menuPreparation = () => {
    const div = document.createElement("div")
    section.appendChild(div)
    div.classList.add("div-preparation")

    const status = document.createElement("h4")
    status.classList.add("status")
    status.textContent= "En préparation"

    const img = document.createElement("p")
    img.classList.add("img-preparation")
    img.textContent = menuImg
    
    const namePlate = document.createElement("p")
    namePlate.textContent = menuName
    namePlate.classList.add("plate-preparation")

    div.append(status,img,namePlate)

    

}


menuPreparation()

