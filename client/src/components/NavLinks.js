import links from '../utils/links'
import { NavLink } from 'react-router-dom'

const NavLinks = ({toggleSidebar}) => {
  return (
      <div className='nav-links'>
          {links.map(link => {
              const { text, id, path, icon } = link
              return (
                  <NavLink to={path} key={id} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link '} onClick={toggleSidebar} end >
                      <span className='icon'>{icon}</span>
                      {text}
                  </NavLink>)
          })}
      </div>
  )
}

export default NavLinks
