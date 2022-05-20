import styles from './Search.module.scss'

import { SearchIcon } from 'assets/svgs'

const DUMMY_RECOMMEND = ['간세포암', '고환암', '뼈암', '구강암']

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <p className={styles.description}>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </p>

      <div className={styles.searchInputWarrper}>
        <SearchIcon />
        <input className={styles.searchInput} placeholder='질환명을 입력해 주세요.' />
        <button type='button' className={styles.searchButton}>
          검색
        </button>
      </div>
      <ul className={styles.dropdown}>
        <span>추천 검색어</span>
        {DUMMY_RECOMMEND.map((dummy) => {
          return <li key={dummy}>{dummy}</li>
        })}
      </ul>
    </div>
  )
}

export default Search
