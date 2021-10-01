window.onload = gifSearchEngine


function gifSearchEngine()
{
    const searchInput = document.getElementById("search-input")
    const searchSubmit = document.getElementById("search-submit")

    enableSearchInputEvents(searchInput, searchSubmit)
}

function enableSearchInputEvents(searchInput, searchSubmit)
{
    searchSubmit.onclick = () => { startSearch(searchInput) }
    searchInput.onkeyup = (e) => {
        if(e.key === "Enter") {
            startSearch(searchInput)
        }
    }
}

function startSearch(searchInput) {
    const searchInputValue = searchInput.value
    
    if(searchInputValue.trim() !== "") {
        getGifs(searchInputValue)
    }
}

async function getGifs(searchInputValue) {
    document.getElementById("search-results-header").innerText = `Search results for ${searchInputValue}`
    const gifs = await giphyApiReq(searchInputValue)
    renderGifs(gifs)
}

async function giphyApiReq(searchInputValue) {
    const gifSearchEndpoint = "https://api.giphy.com/v1/gifs/search"
    let results = []

    await fetch(gifSearchEndpoint + "?" + new URLSearchParams({
        api_key: "MoUv74x5GTCO5ZGGeFB4PePDvAXDs5si",
        q: searchInputValue,
        limit: 50
    }), { mode: "cors"})
    .then(res => res.json())
    .then(data => results = data.data)

    return results
}

function renderGifs(gifs) { 
    const renderArea = document.getElementById("gif-render-area")
    renderArea.innerHTML = ""

    gifs.forEach(gif => {
        const newGif = document.createElement("img")
        newGif.src = gif.images.original.url
        renderArea.appendChild(newGif)
    })
}

