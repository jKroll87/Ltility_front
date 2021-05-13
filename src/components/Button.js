import React, { Component } from 'react';

class Button extends Component {
    pushFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites'));

        if (favorites === null) {
            favorites = [];
        }
        if (favorites.includes(this.props.summonerName)) {
            let deleteIndex = favorites.findIndex((element) => element === this.props.summonerName);
            favorites.splice(deleteIndex, 1);
        }
        else {
            favorites.push(this.props.summonerName);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    render() {
        return(
            <button>
                <img className="favorite" src="star1.png" alt="button" onClick={this.pushFavorite}></img>
            </button>
        )
    }
}

export default Button;