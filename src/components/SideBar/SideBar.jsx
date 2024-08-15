import React, { useState } from 'react';
import './SideBar.css';
import { SideBarData } from '../../data/SideBarData';
import { Link } from 'react-router-dom';
import { useLocation} from 'react-router-dom';

const SideBar = () => {
  const [selected, setSelected] = useState(0);
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="SideBar">
      <div className='menu'>
        {SideBarData.map((item, index) => {
          return (
            <Link to={item.link} key={index} className={pathname.includes(item.link) ? 'menuItem active' : 'menuItem'} onClick={() => setSelected(index)}>
              <item.icon />
              <span>{item.heading}</span>
            </Link>
          );
        })}
        <div className='menuItem'></div>
      </div>
    </div>
  );
}

export default SideBar;
