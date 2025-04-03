import React, { useState } from 'react';
import { AccountSetupPage } from './pages/AccountSetupPage';
import { PlaysPage } from './pages/PlaysPage';
import { ProsPage } from './pages/ProsPage';
import { DashboardPage } from './pages/DashboardPage';
import { ContentPage } from './pages/ContentPage';
import { PlayDetailsPage } from './pages/PlayDetailsPage';
import { Navigation } from './components/Navigation';
import { TopBar } from './components/TopBar';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showAccountSetup, setShowAccountSetup] = useState(false);
  const [selectedPlayId, setSelectedPlayId] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
    if (page === 'account-setup') {
      setShowAccountSetup(true);
    } else {
      setCurrentPage(page);
      // Reset selected play when navigating away from plays
      if (page !== 'plays') {
        setSelectedPlayId(null);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar onNavigate={handleNavigate} />
      <div className="flex-1 flex overflow-hidden">
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-1 overflow-auto">
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'plays' && (
            selectedPlayId ? (
              <PlayDetailsPage playId={selectedPlayId} onBack={() => setSelectedPlayId(null)} />
            ) : (
              <PlaysPage onPlaySelect={setSelectedPlayId} />
            )
          )}
          {currentPage === 'pros' && <ProsPage />}
          {currentPage === 'content' && <ContentPage />}
          {currentPage === 'settings' && <div className="p-8">Settings (Coming Soon)</div>}
        </main>
      </div>
      {showAccountSetup && (
        <div className="fixed inset-0 bg-white z-50">
          <AccountSetupPage onClose={() => setShowAccountSetup(false)} />
        </div>
      )}
    </div>
  );
}

export default App;