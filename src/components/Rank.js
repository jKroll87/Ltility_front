import React, { Component } from 'react';

class Rank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            responseRankList: '',
            rankList: ''
        };
    }

    componentDidMount = () => {
        this.callApi();
    }

    callApi = async () => {
        await fetch('http://sogang.shop/rank', {
            headers: { Accept: 'application/json' }
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                try {
                    this.setState({ responseRankList: res });
                    this.setState({
                        rankList: this.setRankList()
                    });
                } catch (err) {
                    alert(err);
                }
            })
            .catch((err) => {
                alert(err);
                return false;
            });
    }

    setRankList = () => {
        let result = [];
        let summoners = this.state.responseRankList;

        console.log(summoners);

        for (let summoner of summoners) {
            result.push(
                <tr>
                    <td>{summoner.rank}</td>
                    <td>{summoner.summonerName}</td>
                    <td>{summoner.tier}</td>
                    <td>{summoner.leaguePoints}</td>
                </tr>
            )
        }
        return result;
    }

    render() {
        return (
            <div class="layer">
                <table class="table">
                    <caption>RANK</caption>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>소환사명</th>
                            <th>티어</th>
                            <th>LP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rankList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Rank;