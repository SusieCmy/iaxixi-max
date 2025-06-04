import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { SuButton, SuPagination } from 'iaxixi-max'
import { SuButton, SuPagination } from './index'

function App() {
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <>
      <div>
        <SuPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          showPrevNext
          size="md"
          totalPages={10}
          visiblePages={10}
        />
        <button className="btn btn-secondary">Secondary</button>
        <SuButton children="Click me" variant='primary' />
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
      </p>
    </>
  )
}

export default App
