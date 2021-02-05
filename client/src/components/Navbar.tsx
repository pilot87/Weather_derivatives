import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = ({auth}: any): any => {
    const user = auth.name
    if (user === '') return (
        <nav>
            <div className='nav-wrapper'>
                <a href='./' className='brand-logo'>Forecast Trading</a>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li><NavLink to='./login'>Hello, Guest!</NavLink></li>
                </ul>
            </div>
        </nav>
    )

    return (
        <nav>
            <div className='nav-wrapper'>
                <a href='./' className='brand-logo'>Forecast Trading</a>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li><NavLink to='./weather'>Weather</NavLink></li>
                    <li><NavLink to='./statistic'>Statistic</NavLink></li>
                    <li><NavLink to='./futures'>Futures</NavLink></li>
                    <li><NavLink to='./about'>Hello, {user}!</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
