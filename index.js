const catRoute = "http://localhost:3000/api/v1/categories";

document.addEventListener("DOMContentLoaded", () => {
    showCategory()
});

let showCategory = () => {
    fetch(catRoute)
    .then(response => response.json())
    .then(cat => cat.data.forEach(category =>{
        const catContainer = `
        <div cat-id=${category.id}>
        <h3>${category.attributes.name}</h3>
        </div>`
        
        document.querySelector(".category-container").innerHTML+=catContainer;
    })

    )
}