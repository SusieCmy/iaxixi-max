import { useState } from 'react'
import './App.css'
// import { SuButton, SuPagination } from 'iaxixi-max'
import { SuButton, SuPagination } from './index'

function App() {
  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    console.log('page', page);
    
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
          totalPages={100}
          visiblePages={10}
        />
        <button className="btn btn-secondary">Secondary</button>
        <SuButton children="Click me" variant='primary' />
      </div>
      <h1>Vite + React</h1>
    </>
  )
}

export default App
