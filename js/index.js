let pageCounter = 0
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
    let selection = []
    let filteredSelection = []



    //EVENT LISTENERS
    selectColor.addEventListener('submit', event => colorSelect(event))
    filterBy.addEventListener('submit', (event) => filterArray(event))
    containerImages.addEventListener('click', (event) => selectCard(event))
    clickingInsideSelection.addEventListener('click', (event) => selectCard(event))
    buttonClearSelection.addEventListener('click', (event) => clearSelection(event))
    clickingSelect.addEventListener('click', (event) => displaySelected(event))
    clickingGoBack.addEventListener('click', (event) => showAll(event))
    searchByName.addEventListener('submit', (event) => fetchDataByName(event))
    buttonPrevious.addEventListener('click', () => previousPage(event))
    buttonNext.addEventListener('click', () => nextPage(event))


    //FUNCTIONS

    const fetchData = (color) => {

        fetch(`https://api.magicthegathering.io/v1/cards?colors=${color}&page=${pageCounter}`)

            .then((result) => {
                // const page = result.headers.get("link")
                // debugger
                // page.split(' ') we were writing this on the console to get an array with the addresses we needed to see
                //my idea is to hard code the pages we want to go and add a counter to go to the next page
                //we will know which is the last page by seeing a result smaller than 100 items
                //when hitting that last page we will disable the next button

                // console.log(result.headers.get("link"))


                return result.json()

            })
            .then((data) => {
                const arrayOfCards = data.cards
                const cardNames = arrayOfCards.map(e => {
                    return e.name
                })
                console.log(arrayOfCards)
                containerImages.innerHTML = ""
                displayImages(arrayOfCards)
            })

    }
    function nextPage(event) {
        pageCounter++
        console.log("next page")
        fetchData(currentColor)
    }
    function previousPage(event) {
        pageCounter--
        console.log("prev page")
        fetchData(currentColor)
    }





    function displayImages(arrayOfCards) {
        //it's given an array of cards and it returns an array with the image path of each element, if there is no
        //photo available it sends a Message

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


    }
    function displaySelected(event) {
        clickingInsideSelection.innerHTML = ""
        containerImages.style.visibility = "hidden";
        buttonShowAll.style.visibility = "visible";
        buttonClearSelection.style.visibility = "visible";
        buttonSelects.style.visibility = "visible";
        filterBy.style.visibility = "visible"


        selection.forEach(e => {
            const createImages = document.createElement('img')
            createImages.src = e.imageUrl;
            createImages.id = e.name;
            createImages.className = "selected";
            clickingInsideSelection.append(createImages)
        });
        nameButton.disabled = true
        name.disabled = true
        dropDownStatus.disabled = true
        colorButton.disabled = true
        filterDrop.disabled = true
        filterButton.disabled = true








    }


    function selectCard(event) {

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
    }





    function filterArray(event) {
        event.preventDefault()
        filterBy.style.visibility = "visible"
        containerImages.innerHTML = ""

        let selectedFilter = filterByDropDown.value
        filteredSelection.splice(0, filteredSelection.length)


        filteredSelection = allCardsWithImages.filter((array) => {

            return array.types[0] === selectedFilter

        })
        displayImages(filteredSelection)
        // debugger
        filteredSelection.splice(0, filteredSelection.length)


    }

    function fetchDataByName(event) {
        event.preventDefault()
        filterBy.style.visibility = "visible"


        fetch(`https://api.magicthegathering.io/v1/cards?name=${name.value}`)
            .then(result => result.json())
            .then(data => {
                console.log(data)
                const arrayOfCards = data.cards
                console.log(data)
                const cardNames = arrayOfCards.map(e => {
                    return e.name
                })
                containerImages.innerHTML = ""

                displayImages(arrayOfCards)
            })
    }




    function clearSelection(event) {
        console.log("clear")

        const classSelected = document.querySelectorAll(".selected");
        for (i = 0; i < classSelected.length; i++) {
            classSelected[i].className = "";
        }
        clickingInsideSelection.innerHTML = ""
        selection = []

    }

    function showAll(event) {
        buttonShowAll.style.visibility = "hidden";
        buttonClearSelection.style.visibility = "hidden";
        containerImages.style.visibility = "visible";
        clickingInsideSelection.innerHTML = ""
        nameButton.disabled = false
        name.disabled = false
        dropDownStatus.disabled = false
        colorButton.disabled = false
        filterDrop.disabled = false
        filterButton.disabled = false





    }

    function colorSelect(event) {
        event.preventDefault()

        switch (dropDownStatus.value) {
            case "white":
                console.log("We selected white")
                currentColor = "white"
                fetchData("white")
                containerImages.innerHTML = ""
                break

            case "blue":
                console.log("We selected blue")
                currentColor = "blue"
                fetchData("blue")
                containerImages.innerHTML = ""
                break

            case "red":
                console.log("We selected red")
                currentColor = "red"
                fetchData("red")
                containerImages.innerHTML = ""
                break

            case "green":
                console.log("We selected green")
                currentColor = "green"
                fetchData("green")
                containerImages.innerHTML = ""
                break

            case "black":
                console.log("We selected black")
                currentColor = "black"
                fetchData("black")
                containerImages.innerHTML = ""
                break

        }
        // filterBy.style.visibility = "visible"
        buttonShowAll.disabled = false
        buttonClearSelection.disabled = false
        buttonSelects.disabled = false
        filterButton.disabled = false
        filterDrop.disabled = false






    }
})


/* NOTES

to search by name inside of specific color:
https://api.magicthegathering.io/v1/cards?colors=red&name=rat


*/