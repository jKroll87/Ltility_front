import React, { Component } from 'react';

class Button extends Component {
    static getDerivedStateFromProps(props, state) {
        return {};
    }
    constructor(props) {
        super(props);

        this.state = {
            isSelected: 'checked',
        }
    }

    setFavorite = () => {
        let favorites = localStorage.getItem('favorites');
        if (favorites !== null || favorites !== undefined)
            favorites = favorites.split('|');

        if (favorites.includes(this.props.summonerName) === false) {
            favorites += '|' + this.props.summonerName;
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    render() {
        return(
            <button>
                <img class="favorite" src="star1.png" alt="button" onClick={this.setFavorite}></img>
            </button>
        )
    }
}

export default Button;