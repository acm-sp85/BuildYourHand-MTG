//Starting effectively by page 2 cause some of the first pages of the API are repeated...
let pageCounter = 1
let currentColor
document.addEventListener('DOMContentLoaded', (event) => {


    const selectColor = document.getElementById("create-task-form")
    const filterBy = document.getElementById("filter-by")
    const filterByDropDown = document.getElementById("filter")
    const filterButton = document.getElementById("filter-button")
    const dropDownStatus = document.getElementById("color")
    const clickingSelect = document.getElementById("selects")
    const clickingGoBack = document.getElementById("go-to-main")
    const clickingInsideSelection = document.getElementById("selection-container")
    const containerImages = document.getElementById('images-container')
    const name = document.querySelector('[name="name"]')
    const nameButton = document.querySelector('input[name="submit"]')
    const filterDrop = document.querySelector('.filter-selected')
    const searchByName = document.querySelector(".search-card-form")
    const buttonClearSelection = document.getElementById("clear-selection")
    const buttonShowAll = document.querySelector("button#go-to-main")
    const colorButton = document.querySelector('input[name="color-button"]')
    const buttonSelects = document.querySelector("button#selects")
    const buttonPrevious = document.querySelector("button#previous-page")
    const buttonNext = document.querySelector("button#next-page")
    const allCardsWithImages = []
    // const searchNames = []
    let selectedImages = []




    //EVENT LISTENERS
    selectColor.addEventListener('submit', event => colorSelect(event))
    filterBy.addEventListener('submit', (event) => filterArray(event))
    containerImages.addEventListener('click', (event) => selectCard(event))
    clickingInsideSelection.addEventListener('click', (event) => selectCard(event))
    clickingSelect.addEventListener('click', (event) => displaySelected(event))
    buttonClearSelection.addEventListener('click', (event) => clearSelection(event))
    clickingGoBack.addEventListener('click', (event) => showAll(event))
    searchByName.addEventListener('submit', (event) => fetchDataByName(event))
    buttonPrevious.addEventListener('click', () => previousPage(event))
    buttonNext.addEventListener('click', () => nextPage(event))


    //FUNCTIONS

    const fetchData = (color) => {

        fetch(`https://api.magicthegathering.io/v1/cards?colors=${color}&page=${pageCounter}`)

            .then((result) => {

                return result.json()

            })
            .then((data) => {
                const arrayOfCards = data.cards
                console.log(arrayOfCards)
                containerImages.innerHTML = ""
                createSelectionOfCardsWithImages(arrayOfCards)

            })

    }
    function nextPage(event) {
        pageCounter++
        console.log("next page")
        allCardsWithImages.splice(0, allCardsWithImages.length)
        fetchData(currentColor)
    }
    function previousPage(event) {
        pageCounter--
        console.log("prev page")
        allCardsWithImages.splice(0, allCardsWithImages.length)
        fetchData(currentColor)
    }

    function fetchDataByName(event) {
        event.preventDefault()

        containerImages.innerHTML = ""
        clickingInsideSelection.innerHTML = ""

        fetch(`https://api.magicthegathering.io/v1/cards?name=${name.value}`)
            .then(result => result.json())
            .then(data => {

                const arrayOfCards = data.cards
                const cardNames = arrayOfCards.map(e => {
                    return e.name
                })

                allCardsWithImages.splice(0, allCardsWithImages.length)
                arrayOfCards.map(e => {
                    if (e.imageUrl !== undefined) {
                        allCardsWithImages.push(e)
                    } else {
                        return "NO IMAGE AVAILABLE"
                    }
                })
                containerImages.style.visibility = "visible"
                clickingInsideSelection.innerHTML = ""
                displayImages(allCardsWithImages, containerImages)


            })
    }



    function createSelectionOfCardsWithImages(arrayOfCards) {

        arrayOfCards.map(e => {
            if (e.imageUrl !== undefined) {
                allCardsWithImages.push(e)
            } else {
                return "NO IMAGE AVAILABLE"
            }
        })
        displayImages(allCardsWithImages, containerImages)


    }


    function displayImages(array, whereToDisplay) {

        whereToDisplay.innerHTML = ""
        array.forEach(e => {

            const createImages = document.createElement('img')
            createImages.src = e.imageUrl;
            createImages.id = e.name;
            if (e.selected === "yes") {
                createImages.className = "selected";
            } else {
                createImages.className = "";
            }
            whereToDisplay.append(createImages)


        });


    }


    function displaySelected(event) {


        containerImages.style.visibility = "hidden"
        clickingInsideSelection.style.visibility = "visible"

        clickingInsideSelection.innerHTML = ""
        console.log(selectedImages)

        displayImages(selectedImages, clickingInsideSelection)
    }


    function selectCard(event) {


        if (event.target.id != "selection-container") {

            if (event.target.className === "") {
                event.target.className = "selected"

                //actually adding a key in the card object called selected and giving it the value "yes"
                allCardsWithImages.find(card => card.name === event.target.id).selected = "yes"

                allCardsWithImages.forEach(card => {
                    if (card.selected === "yes" && !selectedImages.includes(card)) {
                        selectedImages.push(card)
                    }

                });
                console.log(selectedImages)


            } else if (event.target.className === "selected") {


                event.target.className = ""
                allCardsWithImages.find(card => card.name === event.target.id).selected = "no"
                let indexOfCard = selectedImages.indexOf(allCardsWithImages.find(element => element.name === event.target.id))

                if (indexOfCard > -1) {
                    selectedImages.splice(indexOfCard, 1);

                }

            }
        } else {

        }

    }

    function clearSelection(event) {
        console.log("clear")

        allCardsWithImages.forEach(card => {

            card.selected = ""

        });
        const classSelected = document.querySelectorAll(".selected");
        for (i = 0; i < classSelected.length; i++) {
            classSelected[i].className = "";
        }
        clickingInsideSelection.innerHTML = ""
        selectedImages = []

    }


    function filterArray(event) {
        event.preventDefault()

        containerImages.innerHTML = ""



        let selectedFilter = filterByDropDown.value


        if (selectedFilter === "None") {
            console.log("no filter")
            displayImages(allCardsWithImages, containerImages)


        } else {


            let filteredSelection = allCardsWithImages.filter((cardObject) => {

                return cardObject.types[0] === selectedFilter

            })
            displayImages(filteredSelection, containerImages)


        }


    }






    function showAll(event) {

        containerImages.style.visibility = "visible"

        clickingInsideSelection.innerHTML = ""

        displayImages(allCardsWithImages, containerImages)






    }

    function colorSelect(event) {
        event.preventDefault()
        allCardsWithImages.splice(0, allCardsWithImages.length)
        containerImages.style.visibility = "visible"
        clickingInsideSelection.innerHTML = ""


        switch (dropDownStatus.value) {
            case "white":
                console.log("We selected white")
                currentColor = "white"
                fetchData("white")
                break

            case "blue":
                console.log("We selected blue")
                currentColor = "blue"
                fetchData("blue")
                break

            case "red":
                console.log("We selected red")
                currentColor = "red"
                fetchData("red")
                break

            case "green":
                console.log("We selected green")
                currentColor = "green"
                fetchData("green")
                break

            case "black":
                console.log("We selected black")
                currentColor = "black"
                fetchData("black")
                break

        }


    }
})


