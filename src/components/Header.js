import React from 'react'
import coffee from '../coffee.png'
import heart from '../heart.png'


const Header = (props) => {
    return (
        <div className="header">
            <h1>{props.title}</h1>
            <p className="headline">This app made by
                <img className="heart" src={heart} alt="heart" /> with
                <img src={coffee} alt="coffee" /> <span>by Lazar Veselinovic</span>.
            </p>
        </div>
    );
}

export default Header;
