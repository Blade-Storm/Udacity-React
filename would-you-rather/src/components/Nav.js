import React from 'react'
import {NavLink} from 'react-router-dom'
import SignOut from './SignOut'

const styles = {
    list: {
        listStyleType: "none",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "white"
    },
    li: {
        float: "left",
    },
    navLink:{
        display: "block",
        color: "#3f51b5",
        textalign: "center",
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 16,
        paddingRight: 16,
        textDecoration: "none",
        "&:active": {
            backgroundColor: "#4CAF50"
        },
    },
    nav: {
        marginBottom: 20
    }

}

export default function Nav(){
    return(
        <nav style={styles.nav}>
            <ul style={styles.list}>
                <li style={styles.li}>
                    <NavLink style={styles.navLink} to='/' exact activeClassName='active' className={styles.active}>
                        Home
                    </NavLink>
                </li>
                <li style={styles.li}>
                    <NavLink style={styles.navLink} to='/new' exact activeClassName='active'>
                        New Question
                    </NavLink>
                </li>
                <li style={styles.li}>
                    <NavLink  style={styles.navLink} to='/leaderboard' exact activeClassName='active'>
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