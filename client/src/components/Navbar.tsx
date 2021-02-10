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
                <a href={base} className='brand-logo'>Forecast Trading</a>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li><NavLink to={base + '/login'}>Hello, Guest!</NavLink></li>
                </ul>
            </div>
        </nav>
    )

    return (
        <nav>
            <div className='nav-wrapper'>
                <a href='' className='brand-logo'>Forecast Trading</a>
                <ul id='nav-mobile' className='right hide-on-med-and-down'>
                    <li><NavLink to={base + '/weather'}>Weather</NavLink></li>
                    <li><NavLink to={base + '/statistic'}>Statistic</NavLink></li>
                    <li><NavLink to={base + '/futures'}>Futures</NavLink></li>
                    <li><NavLink to={base + '/about'}>Hello, {user}!</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
