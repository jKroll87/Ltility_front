import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: 'checked',
        }
    }

    setFavorites = () => {
        localStorage.setItem("key", "enable")
    }

    render() {
        return(
            <button>
                <img src="../../public/star1.png" alt="button" onClick={this.setFavorites}></img>
            </button>
        )
    }
}

export default Button;