import React from 'react'
import {NavLink} from 'react-router-dom'

let base = ''
if (process.env.NODE_ENV !== 'development') {
    console.log('NODE_ENV')
    // @ts-ignore
    base = /\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0]
}

export const Navbar = ({auth}: any): any => {
    const user = auth.name
    if (user === '') return (
        <nav>
            <div className='nav-wrapper'>
                <NavLink to='' className='brand-logo'>Forecast Trading</NavLink>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li><NavLink to='login'>Hello, Guest!</NavLink></li>
                </ul>
            </div>
        </nav>
    )

    return (
        <nav>
            <div className='nav-wrapper'>
                <NavLink to='' className='brand-logo'>Forecast Trading</NavLink>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li><NavLink to='/weather'>Weather</NavLink></li>
                    <li><NavLink to='statistic'>Statistic</NavLink></li>
                    <li><NavLink to='futures'>Futures</NavLink></li>
                    <li><NavLink to='about'>Hello, {user}!</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
