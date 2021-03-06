import { ChangeEvent, KeyboardEvent, FormEvent } from 'react'
import { useQuery } from 'react-query'
import { useEffect, useRef, useAppSelector, useQueryDebounce, useAppDispatch, useState } from 'hooks'

import List from './List'
import { SearchIcon } from 'assets/svgs'
import { getDiseasesName } from 'services/search'
import { setActiveIndex, setSearchText } from 'states/search'

import styles from './Search.module.scss'

const Search = () => {
  const debouncedSearchText = useAppSelector((state) => state.disease.debouncedText)
  const activeIndex = useAppSelector((state) => state.disease.activeIndex)
  const searchText = useAppSelector((state) => state.disease.searchText)
  const selectedSearchText = useAppSelector((state) => state.disease.selectedSearchText)
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [searchCount, setSearchCount] = useState<number>(0)

  const divRef = useRef<HTMLDivElement>(null)

  const clickOutside = (event: MouseEvent) => {
    if (!divRef.current?.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside)

    return () => {
      document.removeEventListener('mousedown', clickOutside)
    }
  })

  const inputRef = useRef<HTMLInputElement>(null)
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

    if (event.key === 'ArrowUp')
      dispatch(activeIndex > 0 ? setActiveIndex(activeIndex - 1) : setActiveIndex(data.length - 1))

    if (event.key === 'ArrowDown')
      dispatch(activeIndex === data.length - 1 ? setActiveIndex(0) : setActiveIndex(activeIndex + 1))
  }

  const handleFocusInput = () => {
    if (isOpen) return

    setIsOpen(true)
  }

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(setSearchText(selectedSearchText))
  }

  useEffect(() => {
    dispatch(setActiveIndex(-1))
    inputRef.current?.focus()
  }, [searchText, dispatch])

  return (
    <div className={styles.searchContainer}>
      <header className={styles.description}>
        <h1>
          ?????? ?????? ???????????? ???????????? <br /> ??????????????? ????????????
        </h1>
      </header>
      <main>
        <div className={styles.mainContainer} ref={divRef}>
          <form className={styles.searchInputWrapper} onSubmit={handleSearchSubmit}>
            <SearchIcon className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              value={searchText}
              onChange={handleChangeSearchText}
              placeholder='???????????? ????????? ?????????.'
              onKeyDown={handleKeyMove}
              onFocus={handleFocusInput}
              ref={inputRef}
            />
            <button type='submit' className={styles.searchButton}>
              ??????
            </button>
          </form>

          {debouncedSearchText && isOpen && <List data={data} isLoading={isLoading} />}
        </div>
      </main>
    </div>
  )
}

export default Search
