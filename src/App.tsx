import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import DesignWorkspace from './components/DesignWorkspace';

export default function App() {
  const [view, setView] = useState<'landing' | 'workspace'>('landing');

  return (
    <div className="w-full min-h-screen overflow-hidden">
      {view === 'landing' ? (
        <LandingPage onStartTrial={() => setView('workspace')} />
      ) : (
        <DesignWorkspace onBackToLanding={() => setView('landing')} />
      )}
    </div>
  );
}

