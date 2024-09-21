import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import logo from './../Images/Aurora white.png';

interface Tab {
  id: number;
  name: string;
  icon: string;
  route: string;
}

const tabs: Tab[] = [
  { id: 1, name: 'Human Resource', icon: 'fa-solid fa-briefcase', route: '/hr/employees' },
  { id: 2, name: 'Restaurant', icon: 'fa-solid fa-utensils', route: '/rmanager/addmenu' },
  { id: 3, name: 'Event', icon: 'fa-solid fa-calendar-check', route: '/event' },
  { id: 4, name: 'Rooms', icon: 'fa-solid fa-bed', route: '/roommanager/addroom' },
  { id: 5, name: 'Spa', icon: 'fa-solid fa-spa', route: '/spa' },
  { id: 6, name: 'Shuttle Service', icon: 'fa-solid fa-bus', route: '/Tmanager/drivers' },
  { id: 7, name: 'Feedback', icon: 'fa-solid fa-comment-dots', route: '/GManager/feedback' },
  { id: 8, name: 'Offers', icon: 'fa-solid fa-tags', route: '/offers' },
];

const Sidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(1);

  useEffect(() => {
    const currentTab = tabs.find(tab => tab.route === location.pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [location.pathname]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="Aurora Logo" />
      </div>
      <ul className={styles.tabList}>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`${styles.tabItem} ${activeTab === tab.id ? styles.activeTab : ''}`}
          >
            <Link to={tab.route} className={styles.tabLink} onClick={() => setActiveTab(tab.id)}>
              <i className={`${tab.icon} ${styles.icon}`}></i>
              <span className={styles.tabName}>{tab.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
