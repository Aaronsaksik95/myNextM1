export default {
    add_wish(movie) {
        const newItem = {
            id: movie.id,
            name: movie.name,
            price: movie.price,
            image: movie.image
        }
        var wish = JSON.parse(localStorage.getItem('wish')) || [];
        const alreadyExisting = (el) => el.id === movie.id;
        const index = wish.findIndex(alreadyExisting);
        if (index !== -1) {
            localStorage.setItem('wish', JSON.stringify(wish))
        }
        else {
            wish.push(newItem)
            localStorage.setItem('wish', JSON.stringify(wish))
        }
    },

    get_wish() {
        return JSON.parse(localStorage.getItem('wish'))
    },
    verify_movie_in_wish(id) {
        var wish = JSON.parse(localStorage.getItem('wish'))
        const alreadyExisting = (el) => el.id === movie.id;
        const index = wish.findIndex(alreadyExisting);
        if (index == -1){
            return true
        }
    },
    remove_item_wish(movie) {
        var wish = JSON.parse(localStorage.getItem('wish'))
        const removeWithIndex = (el) => el.id === movie.id;
        const index = wish.findIndex(removeWithIndex);
        wish.splice(index, 1)
        localStorage.setItem('wish', JSON.stringify(wish))
        if (wish.length == 0) {
            this.remove_wish()
        }
        else {
            document.location.reload();
        }
    },

    remove_wish() {
        localStorage.removeItem('wish');
        document.location.reload();
    },
}