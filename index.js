const catRoute = "http://localhost:3000/api/v1/categories";
const vidRoute= "http://localhost:3000/api/v1/videos";

document.addEventListener("DOMContentLoaded", () => {
    showCategory()

let button = document.querySelector(".new-category")
button.addEventListener("click", (e) => {
    createCategory(e)
})
});


let showCategory = () => {
    fetch(catRoute)
    .then(response => response.json())
    .then(cat => cat.data.forEach(category => renderCategory(category)))
}


let renderCategory = (catHash)=> {

    const catDiv = document.createElement("div")
    const vidButton = document.createElement("button")
    const h3 = document.createElement("h3")
    const ul = document.createElement("ul")
   
        
    catDiv.setAttribute("cat-id", catHash.id)
    vidButton.setAttribute("type", "button")
    vidButton.setAttribute("id", catHash.id)
    vidButton.setAttribute("class", "new-video")
    vidButton.innerHTML = "Upload a Video to this Category"
    h3.innerText = catHash.attributes.name


    catDiv.appendChild(h3)
    catDiv.appendChild(vidButton)
    catDiv.appendChild(ul)
       
    
    document.querySelector(".category-container").appendChild(catDiv);
    
    fetch(vidRoute)
    .then(response => response.json())
    .then(vid => vid.data.forEach(video => renderVideo(video)))
    
    vidButton.addEventListener("click", (e) =>{
        createVideo(e)
    })
        
}

let renderVideo = (vidHash)=> {
    const div = document.querySelector(`div[cat-id="${vidHash.attributes.category_id}"] ul`)
    const li  = document.createElement("li")
    

    fetch(vidHash.attributes.video_url)
    .then(response => response.json())
    .then(vidEmb => li.innerHTML = vidEmb.html)

    
    div.appendChild(li)
}

let createCategory = (e) => {
    e.preventDefault()
    let form = document.createElement("form")
    let p = document.createElement("p")
    let submit = document.createElement("button")

    form.setAttribute("class", "new-category-form")
    submit.setAttribute("type", "submit")
    p.innerHTML = "Category Name: <input type='text' name='name' id='cat-name'>"
    submit.innerHTML = "Submit new Category"

    form.appendChild(p)
    form.appendChild(submit)
    document.querySelector(".create-cat").appendChild(form)
    
    form.addEventListener("submit", (e) => {
            submitCatForm(e)
    })
}

let submitCatForm = (e) => {
    e.preventDefault()

    const nameInput = document.querySelector("#cat-name").value

    fetch(catRoute, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify( {
            name: nameInput
        })
    })
   .then(resp => resp.json())
   .then(cat => {
       console.log(cat.data)
       let newCatDiv = document.createElement("div")
       const catH3 = document.createElement("h3")
       newCatDiv.setAttribute("cat-id", cat.data.id)
       catH3.innerText = cat.data.attributes.name
       newCatDiv.appendChild(catH3)
       document.querySelector(".category-container").appendChild(newCatDiv)
       e.target.reset()
   })
   
}

let createVideo = (e) => {
    e.preventDefault()
    let vidForm = document.createElement("form")
    let titleInput = document.createElement("p")
    let vidInput = document.createElement("p")
    let descInput = document.createElement("p")
    let catId = document.createElement("p")
    let submitVid = document.createElement("button")

    vidForm.setAttribute("class", "new-video-form")
    submitVid.setAttribute("type", "submit")
    titleInput.innerHTML = "Video Title: <input type='text' name='title' id='vid-title'>"
    descInput.innerHTML = "Video Description: <input type='text' name='description' id='vid-description'>"
    vidInput.innerHTML = "Video URL **Please make sure you include 'https://host_wesbite/oembed?url=' before the entire URL ie: 'https://www.tiktok.com/oembed?url=':** <br> <input type='text' name='url' id='vid-url'>"
    catId.innerHTML = `Video Category: ${e.currentTarget.previousElementSibling.innerText}`
    submitVid.innerHTML = "Submit new Category"

    vidForm.appendChild(titleInput)
    vidForm.appendChild(descInput)
    vidForm.appendChild(vidInput)
    vidForm.appendChild(catId)
    vidForm.appendChild(submitVid)
    vidDiv = document.querySelector(`div[cat-id="${e.currentTarget.id}"]`)
    ulSelect = document.querySelector(`div[cat-id="${e.currentTarget.id}"] ul`)
    
    vidDiv.insertBefore(vidForm, ulSelect)
}
