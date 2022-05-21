import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'

import Search from 'routes/Search'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path='*' element={<div>Not Found</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
