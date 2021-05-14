import React, { Component } from 'react';

const imagesPath = {
    nostar: 'star1.png',
    star: 'star2.png'
};

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: true
        }
    }

    click = () => {
        this.setFavorite();
        this.toggleImage();
    }

    setFavorite = () => {
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

    toggleImage = () => {
        this.setState(state => ({ isSelected: !state.isSelected }));
    }

    getImageName = () => this.state.isSelected ? 'nostar' : 'star'

    render() {
        const imageName = this.getImageName();
        return(
            <button>
                <img className="favorite" src={imagesPath[imageName]} alt="button" onClick={this.click}></img>
            </button>
        )
    }
}

export default Button;