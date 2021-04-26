document.addEventListener('DOMContentLoaded', (event) => {
    //there is a dropdown that allows us to select the COLOR of our hand

    const selectColor = document.getElementById("create-task-form")
    const dropDownStatus = document.getElementById("color")
    const clicking = document.getElementById("images-container")
    const body = document.querySelector("body")
    const createDiv = document.createElement('div')
    const allCardsWithImages = []
    const selection= []

    
    
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
            allCardsWithImages.push(e)
            return e.imageUrl
        } else {
            return "NO IMAGE AVAILABLE"
        }
    })
    console.log(allCardsWithImages)

}

const printNavigation = (element) => {
    //this function will help us display our navigation options after choosing a color
    //temporary explainatory text
    element.innerHTML = `<p>Make a selection of cards for your hand.</p>`
      
}

//EVENT LISTENER: if we click on a card it selects it - adding a "selected" id
clicking.addEventListener('click',(event)=> {
    
    
    
    if ( event.target.className === ""){
        event.target.className = "selected"
        //adding the selected card Object to the array Selection by finding in the array allCardsWithImages which
        //element shares the same name
        selection.push(allCardsWithImages.find(element => element.name === event.target.id))       
        
    } else if (event.target.className === "selected") {
        //if we click on a selected card we are going to find out its index on the Selection array and then take it out
        //of the array using Splice
        let indexOfCard = selection.indexOf(allCardsWithImages.find(element => element.name === event.target.id))
        
        if (confirm(`Deselect ${event.target.id}?`)){

            if (indexOfCard > -1) {
                selection.splice(indexOfCard, 1);           
                
            }

            event.target.className = ""

        }
        
                
    }
    //at the end of all these our array Selection will be updated and printed
    printSelection(selection)

    
})

function printSelection(selection){
    const ul = document.querySelector('.card-selection-list')
    ul.innerHTML = ''

    selection.forEach(element => {
        const li = document.createElement('li')
        li.innerText = `${element.name}`;
        ul.append(li)
        
    });
    
  }














  

})