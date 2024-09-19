import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';

const header: React.FC = () => {
  return (
    <div>
      <Header activeTab={''} />
      {/* Other components go here */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<header />);
