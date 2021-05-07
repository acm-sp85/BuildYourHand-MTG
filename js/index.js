document.addEventListener('DOMContentLoaded', (event) => {
    //there is a dropdown that allows us to select the COLOR of our hand

    const selectColor = document.getElementById("create-task-form")
    const dropDownStatus = document.getElementById("color")
    const clicking = document.getElementById("images-container")
    const clickingSelect = document.getElementById("selects")
    const clickingGoBack = document.getElementById("go-to-main")
    const clickingClearSelection = document.getElementById("clear-selection")
    const clickingInsideSelection = document.getElementById("selection-container")
    const body = document.querySelector("body")
    const createDiv = document.createElement('div')
    const containerImages = document.getElementById('images-container')
    const containerImagesSelected = document.getElementById('selection-container')


    const allCardsWithImages = []
    let selection = []
    let counter = 0




    selectColor.addEventListener('submit', event => {
        event.preventDefault()

        switch (dropDownStatus.value) {
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

            .then((result) => {
                const page = result.headers.get("link")
                debugger
                // page.split(' ') we were writing this on the console to get an array with the addresses we needed to see
                //my idea is to hard code the pages we want to go and add a counter to go to the next page
                //we will know which is the last page by seeing a result smaller than 100 items
                //when hitting that last page we will disable the next button

                 console.log(result.headers.get("link"))


                return result.json()
            
            })
            .then((data) => {
                const arrayOfCards = data.cards
                // console.log(arrayOfCards)
                console.log(data)

                const cardNames = arrayOfCards.map(e => {
                    return e.name
                })
                displayImages(arrayOfCards)

            })

    }

    const displayImages = (arrayOfCards) => {
        //it's given an array of cards and it returns an array with the image path of each element, if there is no
        //photo available it sends a Message
        document.querySelector("button#selects").style.visibility = "visible";
        document.getElementById("clear-selection").style.visibility = "visible";


        const arrayOfImages = arrayOfCards.map(e => {
            if (e.imageUrl !== undefined) {
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
    clicking.addEventListener('click', (event) => {

        if (event.target.className === "") {
            event.target.className = "selected"
            //adding the selected card Object to the array Selection by finding in the array allCardsWithImages which
            //element shares the same name
            selection.push(allCardsWithImages.find(element => element.name === event.target.id))

        } else if (event.target.className === "selected") {

            let indexOfCard = selection.indexOf(allCardsWithImages.find(element => element.name === event.target.id))

            if (indexOfCard > -1) {
                selection.splice(indexOfCard, 1);

            }

            event.target.className = ""


        }


    })


    clickingSelect.addEventListener('click', () => {

        containerImagesSelected.innerHTML = ""
        containerImages.style.visibility = "hidden";
        document.querySelector("button#go-to-main").style.visibility = "visible";



        selection.forEach(e => {
            const createImages = document.createElement('img')
            createImages.src = e.imageUrl;
            createImages.id = e.name;
            createImages.className = "selected";
            containerImagesSelected.append(createImages)


        });

    })

    //NAVIGATION: ereases html inside selected images div and mutates visibility
    clickingGoBack.addEventListener('click', () => {
        containerImages.style.visibility = "visible";
        containerImagesSelected.innerHTML = ""

    })

    clickingClearSelection.addEventListener('click', () => {
        console.log("clear")
        containerImagesSelected.innerHTML = ""

        const classSelected = document.querySelectorAll(".selected");
        for (i = 0; i < classSelected.length; i++) {
            classSelected[i].className = "";
        }
        selection = []




    })

    clickingInsideSelection.addEventListener('mouseover', (event) => {

        console.log(event.target.id)
    })

})