import React from 'react';
import Header from './Header';
import './MainHome.css';
import SearchBar from './SearchBar';

function MainHome() {
    function handleSearch(searchParams: { date: string; roomType: string; memberCount: number; }): void {
        console.log(searchParams); // Replace with your logic
    }

    return (
        <div className='MainHome-container'>
            <Header activeTab={'home'} />
            <div className='Main-home-content'>
                <h1 className='main-title'>Resort Aurora</h1>
                <SearchBar onSearch={handleSearch} />
            </div>
        </div>
    );
}

export default MainHome;
