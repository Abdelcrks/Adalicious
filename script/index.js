document.getElementById("btn-validate").addEventListener("click", (e)=>{
    e.preventDefault()

    let n= document.getElementById("name").value 

    if(n.length <2){
        showInvalidName()
    }else{
        window.location.href = `pages/menus.html?n=${encodeURIComponent(n)}`
    }
})


const showInvalidName =() =>{
    let invalidName = document.createElement("p")
    document.getElementById('section-container').appendChild(invalidName)
    invalidName.className = "invalid-name"
    invalidName.textContent = "Veuillez écrire votre prénom "
}
