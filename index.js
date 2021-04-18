const catRoute = "http://localhost:3000/api/v1/categories";
const vidRoute= "http://localhost:3000/api/v1/videos";

document.addEventListener("DOMContentLoaded", () => {
    showCategory()
});

let showCategory = () => {
    fetch(catRoute)
    .then(response => response.json())
    .then(cat => cat.data.forEach(category => renderCategory(category)))
}

let showVideos = () => {
    fetch(vidRoute)
    .then(response => response.json())
    .then(vid => vid.data.forEach(video => renderVideo(video)))
}

let renderCategory = (catHash)=> {

    const catDiv = document.createElement("div")
    const h3 = document.createElement("h3")
        
    catDiv.setAttribute("cat-id", catHash.id)
    h3.innerText = catHash.attributes.name
        
    catDiv.appendChild(h3)
       
    document.querySelector(".category-container").appendChild(catDiv);
    
    fetch(vidRoute)
    .then(response => response.json())
    .then(vid => vid.data.forEach(video => renderVideo(video)))
        
}

