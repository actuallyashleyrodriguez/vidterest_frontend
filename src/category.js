class Category {
    constructor(info, infoAttributes) {
        this.id = info.id
        this.name = infoAttributes.name
        Category.all.push(this)
        console.log(this)
    }

    renderCategory() {

        const catDiv = document.createElement("div")
        const vidButton = document.createElement("button")
        const h3 = document.createElement("h3")
        const ul = document.createElement("ul")
       
            
        catDiv.setAttribute("id", this.id)
        vidButton.setAttribute("type", "button")
        vidButton.setAttribute("id", this.id)
        vidButton.setAttribute("class", "new-video")
        ul.setAttribute("class", "videos-list")
        vidButton.innerHTML = "Upload a Video to this Category"
        h3.innerText = this.name
    
    
        catDiv.appendChild(h3)
        catDiv.appendChild(vidButton)
        catDiv.appendChild(ul)
           
        
        document.querySelector(".category-container").appendChild(catDiv);
    
        
        //event listener to add a video form to that specific category
        vidButton.addEventListener("click", (e) =>{
            createVideo(e)
        }, { once: true })
            
    }
   
}
Category.all= [];