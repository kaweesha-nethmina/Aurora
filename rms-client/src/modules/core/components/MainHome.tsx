import SmokeEffect from './effect/SmokeEffect';
import Header from './Header';
import './MainHome.css';


function MainHome() {
    // function handleSearch(searchParams: { date: string; roomType: string; memberCount: number; }): void {
    //     console.log(searchParams); // Replace with your logic
    // }

    return (
        <div className='MainHome-container'>
            <SmokeEffect />
            <Header activeTab={'home'} />
            <div className='Main-home-content'>
                <h1 className='main-title'>Resort Aurora</h1>
                
            </div>
        </div>
    );
}

export default MainHome;
