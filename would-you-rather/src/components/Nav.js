import React from 'react'
import {NavLink} from 'react-router-dom'
import SignOut from './SignOut'


export default function Nav(){
    return(
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/new' exact activeClassName='active'>
                        New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' exact activeClassName='active'>
                        Leaderboard
                    </NavLink>
                </li>
                <li>
                    <SignOut />
                </li>
            </ul>
        </nav>
    )
}