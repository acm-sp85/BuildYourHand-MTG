document.addEventListener('DOMContentLoaded', (event) => {
    //there is a dropdown that allows us to select the COLOR of our hand

    const selectColor = document.getElementById("create-task-form")
    const dropDownStatus = document.getElementById("color")
    const clicking = document.getElementById("images-container")
    const body = document.querySelector("body")
    const createDiv = document.createElement('div')

    
    
    selectColor.addEventListener('submit' , event =>{
        event.preventDefault()
        
        switch (dropDownStatus.value){
            case "white":
                console.log("We selected white")
                fetchData("white")
                printNavigation(selectColor)
                break
                
                case "blue":
                    console.log("We selected blue")
                    fetchData("blue")
                    printNavigation(selectColor)
                    break
                    
                    case "red":
                        console.log("We selected red")
                        fetchData("red")
                        printNavigation(selectColor)
                        break
                        
                        case "green":
                            console.log("We selected green")
                            fetchData("green")
                            printNavigation(selectColor)
                            break
                            
                            case "black":
                                console.log("We selected black")
                                fetchData("black")
                                printNavigation(selectColor)
                                break
                    
                }
                            
                        })
                        

                    
const fetchData = (color) => {
    fetch(`https://api.magicthegathering.io/v1/cards?colors=${color}`)

    .then((result) => result.json())
    .then((data) => {
        const arrayOfCards = data.cards
        console.log(arrayOfCards)

        const cardNames = arrayOfCards.map(e => {
            return e.name
        })
        displayImages(arrayOfCards)                   
    })

} 

const displayImages = (arrayOfCards) => {
    //it's given an array of cards and it returns an array with the image path of each element, if there is no
    //photo available it sends a Message
    const arrayOfImages = arrayOfCards.map( e => {
        if (e.imageUrl !== undefined){
            const containerImages = document.getElementById('images-container')
            const createImages = document.createElement('img')
            createImages.src = e.imageUrl;
            createImages.id = e.name;
            createImages.className = "";
            containerImages.append(createImages)
            return e.imageUrl
        } else {
            return "NO IMAGE AVAILABLE"
        }
    })

}

const printNavigation = (element) => {
    //this function will help us display our navigation options after choosing a color
    //temporary explainatory text
    element.innerHTML = `<p>Make a selection of cards for your hand.</p>`
    
    //creates a div where we will insert our list of selections
    createDiv.innerHTML= `<p>YOU JUST CREATED ME</p>`
    body.appendChild(createDiv)

    
}

//EVENT LISTENER: if we click on a card it selects it - adding a "selected" id
clicking.addEventListener('click',(event)=> {
    
    
    
    if ( event.target.className === ""){
        event.target.className = "selected"

        const ul = document.querySelector('.card-selection-list')
        const li = document.createElement('li')

        li.innerText = `${event.target.id}`;
        ul.append(li)

    } else {
        event.target.className = ""
    }
    
  })














  

})