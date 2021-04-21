document.addEventListener('DOMContentLoaded', (event) => {

    console.log("DOM loaded")

    fetchMetData()
    
    
    
    
})

const fetchMetData = () => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q=hopper")
    .then((result) => result.json())
    .then((data) => console.log(data.objectIDs))

}