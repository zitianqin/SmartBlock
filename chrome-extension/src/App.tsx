import './App.css'
import BlockedSite from './blocked/BlockedSite'
import Chat from './components/Chat'

function App() {

  return (
    <div className="flex flex-col h-[100dvh] justify-center w-full">
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <div className="flex flex-col justify-center">
        <BlockedSite />
        <Chat />
      </div>
    </div>
  )
}

export default App
