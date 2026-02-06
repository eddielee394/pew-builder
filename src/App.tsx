import { Viewer3D, FirearmSelector, AccessoryList, BuildSummary } from './components'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Pew Builder</h1>
        <span className="tagline">Firearm configuration & build tool</span>
      </header>

      <main className="main">
        <aside className="sidebar">
          <FirearmSelector />
          <AccessoryList />
          <BuildSummary />
        </aside>

        <div className="viewer-container">
          <Viewer3D />
        </div>
      </main>
    </div>
  )
}

export default App
