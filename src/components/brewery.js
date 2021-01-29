class Brewery {
    static breweryNames = []
    constructor(brewery) {
        this.id = brewery.id
        this.name = brewery.attributes.name
        this.city = brewery.attributes.city
        this.state = brewery.attributes.state
        this.favorites = brewery.attributes.favorites
        Brewery.breweryNames.push(this)
    }

    static sortBrewery() {
        const sortedBrewery = this.breweryNames.sort((a,b) => a.name.localeCompare(b.name))
        breweryUL.innerHTML = ""
        sortedBrewery.forEach(brewery => brewery.createBreweryCard())
    }

    static renderBreweries() {
        for (let brewery of this.breweryNames) {
            brewery.createBreweryCard()
        }
    }

    static getBreweries() {
        fetch(breweriesURL)
        .then(resp => resp.json())
        .then(breweries => {
            for (let brewery of breweries) {
                let newBrewery = new Brewery(brewery.data)
            }
            this.renderBreweries()
        })
    }

    createBreweryCard() {
        const li = document.createElement('li')
        li.dataset.id = this.id
        li.className = "my-2 p-4 bg-green-700 shadow rounded"

        const h1 = document.createElement('h1')
        h1.className = "text-3x1 font-semibold text-gray-300 py-3 pt-0"
        h1.innerHTML = `${this.name}`

        const p = document.createElement('p')
        p.className = "city-state"
        p.innerHTML = `${this.city}, ${this.state}`

        const deleteBtn = document.createElement("button")
        deleteBtn.className = "text-xl float-right p-3 pt-0 mt-1 ml-4 hover:opacity-50 shadow-sm hover:shadow-lg"
        deleteBtn.innerHTML = `<i class="fa fa-trash-alt"></i>`
        deleteBtn.addEventListener("click", this.deleteBrewery)

        const favoriteList = document.createElement('ul')
        favoriteList.setAttribute("id", "favorite-list");

        // this.favorites.forEach(favorite => {
        //     let favoriteObj = new Favorite(favorite);
        //     favoriteObj.createFavoriteCard(favoriteList)
        // })

        const favoriteForm = document.createElement('form')
        favoriteForm.innerHTML +=
        `
        <div class="text-xl mt-2 p-1 w-2/5 md:w-1/7 mb-2 semibold text-gray-300">Add your Favorite Beer Here:</div>
        <input type="text" name="input" id="favorite-input" class="flex-1 p-2 border-2 border-gray-500 rounded" placeholder="New Favorite"/>
        <button type="submit" class="flex-none"><i class="fa fa-plus p-3 z--1 bg-yellow-600"></i></button>
        </div>
        `
        favoriteForm.addEventListener("submit", Favorite.createFavorite)

        li.append(deleteBtn, h1, p, favoriteList, favoriteForm)

        breweryUL.appendChild(li)

        breweryForm.reset()
    }

    static postBreweries() {
        event.preventDefault()
        fetch(breweriesURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: breweryName.value,
                city: breweryCity.value,
                state: breweryState.value
            })
        })
        .then(resp => resp.json())
        .then(breweryData => {
            let newBrewery = new Brewery(breweryData.data)
            newBrewery.createBreweryCard()
        })
        .catch(err => alert(err))
    }

    deleteBrewery() {
        const breweryId = this.parentElement.dataset.id

        fetch(`${breweriesURL}/${breweryId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.parentElement.remove()
    }
}