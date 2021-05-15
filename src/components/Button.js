import React from 'react';

const imagePaths = {
    unFavoriteStar: 'unfavoritestar.png',
    favoriteStar: 'favoritestar.png'
};

class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: this.props.isSelected
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isSelected !== state.isSelected) {
            return {
                isSelected: props.isSelected
            };
        }
        return {};
    }

    buttonClicked = () => {
        if (this.state.isSelected) {
            this.props.deleteFavorite(this.props.summonerName);
        }
        else {
            this.props.addFavorite(this.props.summonerName);
        }
        this.toggleStarImage();
        this.updateFavorites();
    }

    toggleStarImage = () => {
        this.setState(state => ({ isSelected: !state.isSelected }));
    }

    getImageName = () => { return this.state.isSelected ? 'favoriteStar' : 'unFavoriteStar' }

    updateFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        if (favorites?.includes(this.props.summonerName)) {
            let deleteIndex = favorites.findIndex((element) => element === this.props.summonerName);
            favorites.splice(deleteIndex, 1);
        }
        else {
            if (favorites === null) favorites = [];
            favorites.push(this.props.summonerName);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    render() {
        const imageName = this.getImageName();
        return (
            <button onClick={this.buttonClicked}>
                <img className="favorite" src={imagePaths[imageName]} alt="button"></img>
            </button>
        )
    }
}

export default Button;