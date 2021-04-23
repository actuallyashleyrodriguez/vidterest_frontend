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
    const h3 = document.createElement("h3")
    const ul = document.createElement("ul")
   
        
    catDiv.setAttribute("cat-id", catHash.id)
    h3.innerText = catHash.attributes.name

    catDiv.appendChild(h3)
    catDiv.appendChild(ul)
       
    
    document.querySelector(".category-container").appendChild(catDiv);
    

    
    fetch(vidRoute)
    .then(response => response.json())
    .then(vid => vid.data.forEach(video => renderVideo(video)))
        
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
       console.log(cat)
   })
   
}
