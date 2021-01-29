const breweriesURL = "http://localhost:3000/breweries"
const favoritesURL = "http://localhost:3000/favorites"
const breweryForm = document.getElementById("create-brewery-form")
const breweryName = document.getElementById("brewery-name")
const breweryCity = document.getElementById('brewery-city')
const breweryState = document.getElementById('brewery-state')
const breweryUL = document.getElementById('brewery-ul')
const searchButton = document.getElementById('sort')
const favoriteList = document.createElement('ul')

Brewery.getBreweries()

breweryForm.addEventListener("submit", Brewery.postBreweries)

searchButton.addEventListener("click", () => Brewery.sortBrewery())
