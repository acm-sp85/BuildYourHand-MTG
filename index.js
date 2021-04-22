document.addEventListener('DOMContentLoaded', (event) => {

    //there is a dropdown that allows us to select the COLOR of our hand
    const selectColor = document.getElementById("create-task-form")
    const dropDownStatus = document.getElementById("color")
    

    selectColor.addEventListener('submit' , event =>{
        event.preventDefault()

        switch (dropDownStatus.value){
            case "white":
                console.log("We selected white")
                  fetchData("white")
                //   selectColor.innerHTML = ""
                break

            case "blue":
                console.log("We selected blue")
                fetchData("blue")
                // selectColor.innerHTML = ""
                break

            case "red":
                console.log("We selected red")
                fetchData("red")
                // selectColor.innerHTML = ""
                break

            case "green":
                console.log("We selected green")
                fetchData("green")
                // selectColor.innerHTML = ""
                break

            case "black":
                console.log("We selected black")
                fetchData("black")
                // selectColor.innerHTML = ""
                break
        
        }

    })
    
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
        // console.log(cardNames)  
        displayImages(arrayOfCards)                   
    })

} 

const displayImages = (arrayOfCards) => {
    //it's given an array of cards and it returns an array with the image path of each element, if there is no
    //photo available it sends a Message
    const arrayOfImages = arrayOfCards.map( e => {
        if (e.imageUrl !== undefined){

            return e.imageUrl
        } else {
            return "NO IMAGE AVAILABLE"
        }
    })
    console.log(arrayOfImages)

    arrayOfImages.forEach(element => {
        // I'm going to create an image and append it
        if (element === "NO IMAGE AVAILABLE"){
            console.log("Missing image")
        } else {

            const containerImages = document.getElementById('images-container')
            const createImages = document.createElement('img')
            createImages.src = element;
            containerImages.append(createImages)
            
        }


    });

}

