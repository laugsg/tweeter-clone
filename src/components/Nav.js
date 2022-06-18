import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' className='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' className='active'>
            New Tweet
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}