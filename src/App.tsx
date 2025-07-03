import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import QuoteForm from './components/QuoteForm';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

function App() {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (success: boolean) => {
    setIsLoggedIn(success);
    if (success) {
      setIsAdminPanelOpen(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdminPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onLoginClick={() => setIsLoginModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      <main>
        <Hero onGetQuote={() => setIsQuoteFormOpen(true)} />
        <Services />
      </main>

      <Footer />

      <QuoteForm 
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
    </div>
  );
}

export default App;