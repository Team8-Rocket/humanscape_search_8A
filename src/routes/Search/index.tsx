import { ChangeEvent, KeyboardEvent } from 'react'
import { useQuery } from 'react-query'
import { useEffect, useRef, useAppSelector, useQueryDebounce, useAppDispatch, useState } from 'hooks'
import { getDiseasesName } from 'services/search'

import styles from './Search.module.scss'
import { SearchIcon } from 'assets/svgs'
import List from './List'
import { setActiveIndex, setSearchText } from 'states/search'

const Search = () => {
  const debouncedSearchText = useAppSelector((state) => state.disease.debouncedText)
  const activeIndex = useAppSelector((state) => state.disease.activeIndex)
  const searchText = useAppSelector((state) => state.disease.searchText)

  const dispatch = useAppDispatch()

  const [searchCount, setSearchCount] = useState<number>(0)

  const ref = useRef<HTMLInputElement>(null)
  useQueryDebounce(searchText.replaceAll(' ', ''))

  const { data, isLoading } = useQuery(
    ['diseaseList', debouncedSearchText],
    () => getDiseasesName(debouncedSearchText, searchCount, setSearchCount),

    {
      enabled: !!debouncedSearchText,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  )

  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget
    dispatch(setSearchText(value))
  }

  const handleKeyMove = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!data || event.nativeEvent.isComposing) return

    if (event.key === 'Enter') {
      dispatch(setSearchText(searchText))
      return
    }
    if (event.key === 'ArrowUp')
      dispatch(activeIndex > 0 ? setActiveIndex(activeIndex - 1) : setActiveIndex(data.length - 1))

    if (event.key === 'ArrowDown')
      dispatch(activeIndex === data.length - 1 ? setActiveIndex(0) : setActiveIndex(activeIndex + 1))
  }

  useEffect(() => {
    dispatch(setActiveIndex(-1))
    ref.current?.focus()
  }, [searchText, dispatch])

  return (
    <div className={styles.searchContainer}>
      <p className={styles.description}>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </p>

      <form className={styles.searchInputWrapper}>
        <SearchIcon className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          value={searchText}
          onChange={handleChangeSearchText}
          placeholder='질환명을 입력해 주세요.'
          onKeyDown={handleKeyMove}
          ref={ref}
        />
        <button type='button' className={styles.searchButton}>
          검색
        </button>
      </form>

      {debouncedSearchText && <List data={data} isLoading={isLoading} />}
    </div>
  )
}

export default Search
