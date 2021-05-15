import React from 'react';
import Button from './Button';

class Rank extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            responseRankList: '',
            rankList: '',
            favorites: JSON.parse(localStorage.getItem('favorites')),
            favoritesRankList: ''
        }
    }

    componentDidMount = () => {
        this.callRankApi();
    }

    render() {
        return (
            <div className="layer">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>소환사명</th>
                            <th>티어</th>
                            <th>LP</th>
                            <th>즐겨찾기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.favoritesRankList ? this.state.favoritesRankList : null}
                        {this.state.rankList ? this.state.rankList : null}
                    </tbody>
                </table>
            </div>
        )
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.favorites !== this.state.favorites) {
            this.createFavoriteRankList();
            this.createRankList();
        }
    }

    callRankApi = async () => {
        await fetch('http://sogang.shop/api/rank')
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                try {
                    this.setState({ responseRankList: res });
                    this.createRankList();
                    this.createFavoriteRankList();
                } catch (err) {
                    alert(err);
                }
            })
            .catch((err) => {
                alert(err);
                return false;
            });
    }

    addFavorite = (summonerName) => {
        let favoritesArray;
        if (this.state.favorites === null) {
            favoritesArray = [];
        }
        else {
            favoritesArray = [...this.state.favorites];
        }
        this.setState(({
            favorites: favoritesArray
        }), () => {
            if (this.state.favorites.includes(summonerName)) return;
            this.setState(state => ({
                favorites: [...state.favorites, summonerName]
            }))
        })
    }

    deleteElementInArray = (arr, element) => {
        let newArray;
        if (arr !== null) newArray = [...arr];
        else {
            newArray = [];
            return newArray;
        }
        if (newArray?.includes(element)) {
            let deleteIndex = newArray.findIndex((e) => e === element);
            newArray.splice(deleteIndex, 1);
        }
        return newArray;
    }

    deleteFavorite = (summonerName) => {
        this.setState(state => ({
            favorites: this.deleteElementInArray(state.favorites, summonerName)
        }))
    }

    createRankList = () => {
        let newRankList = [];
        let summoners = this.state.responseRankList;
        for (let i in summoners) {
            let isSelected = this.state.favorites?.includes(summoners[i].summonerName);
            newRankList.push(
                <tr key={`summoner_${summoners[i].summonerName}`}>
                    <td>{summoners[i].rank}</td>
                    <td>{summoners[i].summonerName}</td>
                    <td>{summoners[i].tier}</td>
                    <td>{summoners[i].leaguePoints}</td>
                    <td>
                        <Button
                            summonerName={summoners[i].summonerName}
                            isSelected={isSelected}
                            addFavorite={this.addFavorite}
                            deleteFavorite={this.deleteFavorite}>
                        </Button>
                    </td>
                </tr>
            )
        }
        this.setState({
            rankList: newRankList
        })
    }

    createFavoriteRankList = () => {
        let newFavoritesRankList = [];
        let summoners = this.state.responseRankList;
        let selectedSummonerNames = this.state.favorites;
        let selectedSummoners = [];
        if (selectedSummonerNames !== null) {
            for (let name of selectedSummonerNames) {
                for (let i in summoners) {
                    if (summoners[i].summonerName === name) {
                        selectedSummoners.push(summoners[i]);
                        break;
                    }
                }
            }
        }
        selectedSummoners.sort((a, b) => {
            if (a.leaguePoints !== b.leaguePoints) return b.leaguePoints - a.leaguePoints;
            return a.summonerName > b.summonerName ? 1 : -1;
        })
        for (let i in selectedSummoners) {
            newFavoritesRankList.push(
                <tr key={`summoner_${selectedSummoners[i].summonerName}`}>
                    <td>{selectedSummoners[i].rank}</td>
                    <td>{selectedSummoners[i].summonerName}</td>
                    <td>{selectedSummoners[i].tier}</td>
                    <td>{selectedSummoners[i].leaguePoints}</td>
                    <td>
                        <Button
                            summonerName={selectedSummoners[i].summonerName}
                            isSelected={true}
                            addFavorite={this.addFavorite}
                            deleteFavorite={this.deleteFavorite}>
                        </Button>
                    </td>
                </tr>
            )
        }
        newFavoritesRankList.push(
            <tr key="boundary">
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        )
        this.setState({
            favoritesRankList: newFavoritesRankList
        })
    }
}

export default Rank;