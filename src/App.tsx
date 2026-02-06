import { useState } from 'react'
import { Viewer3D, FirearmSelector, AccessoryList, BuildSummary } from './components'
import './App.css'

type MobileView = 'config' | 'view'

function App() {
  const [mobileView, setMobileView] = useState<MobileView>('view')

  return (
    <div className="app">
      <header className="header">
        <h1>Pew Builder</h1>
        <span className="tagline">Firearm configuration & build tool</span>
      </header>

      <main className="main">
        <aside className={`sidebar ${mobileView === 'config' ? 'sidebar--visible' : ''}`}>
          <FirearmSelector />
          <AccessoryList />
          <BuildSummary />
        </aside>

        <div className={`viewer-container ${mobileView === 'view' ? 'viewer-container--visible' : ''}`}>
          <Viewer3D />
        </div>
      </main>

      <nav className="mobile-tabs" aria-label="Mobile navigation">
        <button
          type="button"
          className={`mobile-tab ${mobileView === 'config' ? 'mobile-tab--active' : ''}`}
          onClick={() => setMobileView('config')}
          aria-pressed={mobileView === 'config'}
        >
          Config
        </button>
        <button
          type="button"
          className={`mobile-tab ${mobileView === 'view' ? 'mobile-tab--active' : ''}`}
          onClick={() => setMobileView('view')}
          aria-pressed={mobileView === 'view'}
        >
          View 3D
        </button>
      </nav>
    </div>
  )
}

export default App
