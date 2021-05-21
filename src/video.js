class Video {
    constructor(data) {
        this.title = data.title
        this.description = data.description
        this.video_url = data.video_url
        this.category_id = data.category_id
        Video.all.push(this)
       
    }
    renderVideo() {
        const div = document.querySelector(`div[id="${this.category_id}"] ul`)
        const li  = document.createElement("li")
        const subUL = document.createElement("ul")
        const subLI = document.createElement("li")
        li.setAttribute("class", "vid-list") 
        subLI.setAttribute("class", "vid-list")
        subLI.setAttribute("id", "vid-url")
    
        
    //fetch request to OEMBED JSON on videos
    
        fetch(this.video_url)
        .then(response => response.json())
        .then(vidEmb => subLI.innerHTML = vidEmb.html)

        li.innerText =  this.title
        subUL.appendChild(subLI)
        li.appendChild(subUL)

        div.appendChild(li)

    }
}

Video.all= [];