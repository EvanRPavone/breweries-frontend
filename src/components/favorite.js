class Favorite {
    constructor(favorite) {
        this.id = favorite.id
        this.brewery_id = favorite.brewery_id
        this.name = favorite.name
        this.li = document.createElement('li')
    }

    static createFavorite(e) {
        e.preventDefault()
        const favoriteInput = e.target.children.input.value
        const favoriteList = document.getElementById("favorite-list")
        const breweryId = e.target.parentElement.dataset.id
        Favorite.postFavorites(favoriteInput, favoriteList, breweryId)

        e.target.reset()
    }

    static postFavorites(favorite, favoriteList, breweryId) {
        fetch(favoritesURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: favorite,
                brewery_id: breweryId
            })
        })
        .then(resp => resp.json())
        .then(favorite => {
            let newFavorite = new Favorite(favorite.data.attributes)
            newFavorite.createFavoriteCard(favoriteList)
        })
        .catch(err => alert(err))
    }

    createFavoriteCard(favoriteList) {
        this.li.dataset.id = this.brewery_id
        this.li.className = "py-4 subpixel-antialiased font-medium col-span-10 my-2 px-2 bg-white w-5/12 rounded border-green-300 shadow-inner fst-italic"
        this.li.innerHTML = `${this.name}`

        const deleteBtn = document.createElement('button')
        deleteBtn.className = "ml-2 px- float-right p-2 pt-0 mt-1 ml-2 hover:opacity-50 shadow-sm hover:shadow-sm"
        deleteBtn.innerHTML = `<i class="fa fa-trash-alt"></i>`
        deleteBtn.addEventListener("click", (_event) => { this.deleteFavorite() })
        this.li.appendChild(deleteBtn)
        favoriteList.appendChild(this.li)
    }

    deleteFavorite() {
        fetch(`${favoritesURL}/${this.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.li.remove()
    }
}