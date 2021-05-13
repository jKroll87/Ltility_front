import React, { Component } from 'react';
import Button from './Button';

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
        await fetch('http://sogang.shop/rank')
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

        for (let i in summoners) {
            result.push(
                <tr key={`summoner_${i}`}>
                    <td>{summoners[i].rank}</td>
                    <td>{summoners[i].summonerName}</td>
                    <td>{summoners[i].tier}</td>
                    <td>{summoners[i].leaguePoints}</td>
                    <td>
                        <Button
                            summonerName={summoners[i].summonerName}>
                        </Button>
                    </td>
                </tr>
            )
        }
        return result;
    }

    render() {
        return (
            <div className="layer">
                <table className="styled-table">
                    {/* <caption>RANK</caption> */}
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
                        {this.state.rankList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Rank;