import { Routes, Route } from 'react-router-dom'

import Search from './Search'

import styles from './Routes.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
