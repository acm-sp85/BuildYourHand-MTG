
document.addEventListener('DOMContentLoaded', (event) => {
    let pageCounter = 1
    let currentColor
    const allCardsWithImages = []
    let selectedImages = []
    const selectColor = document.getElementById("create-task-form")
    const searchByName = document.querySelector(".search-card-form")
    const filterBy = document.getElementById("filter-by")
    const containerImages = document.getElementById('images-container')
    const clickingInsideSelection = document.getElementById("selection-container")
    const clickingSelect = document.getElementById("selects")
    const clickingGoBack = document.getElementById("go-to-main")
    const buttonClearSelection = document.getElementById("clear-selection")
    const buttonPrevious = document.querySelector("button#previous-page")
    const buttonNext = document.querySelector("button#next-page")
    //EVENT LISTENERS
    selectColor.addEventListener('submit', event => colorSelect(event))
    searchByName.addEventListener('submit', (event) => fetchDataByName(event))
    filterBy.addEventListener('submit', (event) => filterArray(event))
    containerImages.addEventListener('click', (event) => selectCard(event))
    clickingInsideSelection.addEventListener('click', (event) => selectCard(event))
    clickingSelect.addEventListener('click', (event) => displaySelected(event))
    clickingGoBack.addEventListener('click', (event) => showAll(event))
    buttonClearSelection.addEventListener('click', (event) => clearSelection(event))
    buttonPrevious.addEventListener('click', () => previousPage(event))
    buttonNext.addEventListener('click', () => nextPage(event))
    //FUNCTIONS
    visibilityOn = makeVisible => makeVisible.style.visibility = "visible"
    visibilityOff = hide => hide.style.visibility = "hidden"

    colorSelect = event => {
        const dropDownStatus = document.getElementById("color")
        const nextButton = document.getElementById('next-page')
        event.preventDefault()
        allCardsWithImages.splice(0, allCardsWithImages.length)
        visibilityOn(containerImages)
        visibilityOn(nextButton)
        visibilityOn(clickingSelect)
        visibilityOn(filterBy)
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
    fetchData = color => {
        fetch(`https://api.magicthegathering.io/v1/cards?colors=${color}&page=${pageCounter}`)
            .then(result => result.json())
            .then(data => {
                if (data.cards.length === 0) {
                    visibilityOff(buttonNext)
                    pageCounter = pageCounter - 1
                } else {
                    const arrayOfCards = data.cards
                    containerImages.innerHTML = ""
                    createSelectionOfCardsWithImages(arrayOfCards)
                    displayImages(allCardsWithImages, containerImages)
                    console.log(allCardsWithImages)
                }
            })
    }

    fetchDataByName = cardName => {
        cardName.preventDefault()
        const name = document.querySelector('[name="name"]')
        containerImages.innerHTML = ""
        clickingInsideSelection.innerHTML = ""

        fetch(`https://api.magicthegathering.io/v1/cards?name=${name.value}`)
            .then(result => result.json())
            .then(data => {
                const arrayOfCards = data.cards
                arrayOfCards.map(e => e.name)
                allCardsWithImages.splice(0, allCardsWithImages.length)
                arrayOfCards.map(e => {
                    if (e.imageUrl !== undefined) {
                        allCardsWithImages.push(e)
                    }
                })
                visibilityOn(containerImages)
                visibilityOn(clickingSelect)
                visibilityOff(buttonPrevious)
                visibilityOff(buttonNext)
                clickingInsideSelection.innerHTML = ""
                displayImages(allCardsWithImages, containerImages)
            })
    }

    createSelectionOfCardsWithImages = arrayOfCards => {

        arrayOfCards.map(card => {
            if (card.imageUrl !== undefined) {
                allCardsWithImages.push(card)
            }
        })
    }

    displayImages = (array, whereToDisplay) => {
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
    displaySelected = () => {
        visibilityOn(clickingGoBack)
        visibilityOn(buttonClearSelection)
        visibilityOn(clickingInsideSelection)
        visibilityOff(containerImages)
        visibilityOff(filterBy)
        visibilityOff(buttonNext)
        visibilityOff(buttonPrevious)
        clickingInsideSelection.innerHTML = ""
        displayImages(selectedImages, clickingInsideSelection)
    }
    clearSelection = () => {
        clickingSelect.innerText = `GO TO YOUR SELECTION`
        allCardsWithImages.forEach(card => card.selected = "");
        const classSelected = document.querySelectorAll(".selected");
        for (i = 0; i < classSelected.length; i++) {
            classSelected[i].className = "";
        }
        clickingInsideSelection.innerHTML = ""
        selectedImages = []
    }
    selectCard = event => {
        if (event.target.id != "selection-container") {

            if (selectedImages.length <= 59) {

                if (event.target.className === "") {
                    event.target.className = "selected"

                    //updates Selection Button
                    clickingSelect.innerText = `GO TO YOUR SELECTION ${selectedImages.length + 1}/60`

                    //actually adding a key in the card object called selected and giving it the value "yes"
                    allCardsWithImages.find(card => card.name === event.target.id).selected = "yes"

                    allCardsWithImages.forEach(card => {
                        if (card.selected === "yes" && !selectedImages.includes(card)) {
                            selectedImages.push(card)
                        }

                    });
                    console.log(selectedImages)


                } else if (event.target.className === "selected") {

                    //updates Selection Button
                    clickingSelect.innerText = `GO TO YOUR SELECTION ${selectedImages.length - 1}/60`
                    event.target.className = ""
                    allCardsWithImages.find(card => card.name === event.target.id).selected = "no"
                    let indexOfCard = selectedImages.indexOf(allCardsWithImages.find(element => element.name === event.target.id))

                    if (indexOfCard > -1) {
                        selectedImages.splice(indexOfCard, 1);

                    }

                }

            } else {

                if (event.target.className === "selected") {
                    //updates Selection Button
                    clickingSelect.innerText = `GO TO YOUR SELECTION ${selectedImages.length - 1}/60`
                    event.target.className = ""
                    allCardsWithImages.find(card => card.name === event.target.id).selected = "no"
                    let indexOfCard = selectedImages.indexOf(allCardsWithImages.find(element => element.name === event.target.id))

                    if (indexOfCard > -1) {
                        selectedImages.splice(indexOfCard, 1);

                    }
                } else {
                    window.alert("Your deck is already 60 cards.")

                }
            }
        }
    }
    nextPage = () => {
        containerImages.innerHTML = ""
        pageCounter++
        const previousButton = document.getElementById('previous-page')
        visibilityOn(previousButton)
        console.log("next page")
        allCardsWithImages.splice(0, allCardsWithImages.length)
        fetchData(currentColor)
    }
    previousPage = () => {
        const previousButton = document.getElementById('previous-page')
        visibilityOn(buttonNext)
        containerImages.innerHTML = ""

        if (pageCounter === 2) {
            pageCounter--
            visibilityOff(previousButton)
            console.log("prev page")
            allCardsWithImages.splice(0, allCardsWithImages.length)
            fetchData(currentColor)
        } else {
            pageCounter--
            console.log("prev page")
            allCardsWithImages.splice(0, allCardsWithImages.length)
            fetchData(currentColor)
        }
    }
    filterArray = event => {
        const filterByDropDown = document.getElementById("filter")
        event.preventDefault()
        containerImages.innerHTML = ""
        let selectedFilter = filterByDropDown.value

        if (selectedFilter === "None") {
            console.log("no filter")
            displayImages(allCardsWithImages, containerImages)

        } else {
            let filteredSelection = allCardsWithImages.filter((cardObject) => cardObject.types[0] === selectedFilter)
            displayImages(filteredSelection, containerImages)
        }
    }
    showAll = () => {
        visibilityOn(containerImages)
        visibilityOn(filterBy)
        visibilityOn(buttonNext)
        if (pageCounter > 1) { visibilityOn(buttonPrevious) }
        visibilityOff(clickingGoBack)
        visibilityOff(buttonClearSelection)
        clickingInsideSelection.innerHTML = ""
        displayImages(allCardsWithImages, containerImages)
    }

})


