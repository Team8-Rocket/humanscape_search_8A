import classNames from 'classnames'
import { useEffect, useAppDispatch, useAppSelector } from 'hooks'

import { SearchIcon } from 'assets/svgs'
import { setActiveIndex, setSearchText, setSelectedSearchText } from 'states/search'
import { IItem } from '../../types/search.d'
import styles from './ListItem.module.scss'

interface Props {
  diseaseItem: IItem
  ListItemIndex: number
}

const ListItem = ({ diseaseItem, ListItemIndex }: Props): JSX.Element | null => {
  const debouncedSearchText = useAppSelector((state) => state.disease.debouncedText)
  const activeIndex = useAppSelector((state) => state.disease.activeIndex)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (ListItemIndex === activeIndex) {
      dispatch(setSelectedSearchText(diseaseItem.sickNm))
    }
  }, [ListItemIndex, activeIndex, diseaseItem.sickNm, dispatch])

  const handleActiveIndex = () => {
    dispatch(setActiveIndex(ListItemIndex))
    dispatch(setSelectedSearchText(diseaseItem.sickNm))
  }

  const itemsButtonClick = () => {
    dispatch(setSearchText(diseaseItem.sickNm))
  }

  return (
    <li className={classNames({ [styles.active]: ListItemIndex === activeIndex })}>
      <SearchIcon className={styles.searchIcon} />
      <button
        className={styles.itemButton}
        type='button'
        onMouseOver={handleActiveIndex}
        onFocus={handleActiveIndex}
        onClick={itemsButtonClick}
      >
        {diseaseItem.sickNm.split(debouncedSearchText)[0]}
        <mark className={styles.highlight}>{debouncedSearchText}</mark>
        {diseaseItem.sickNm.split(debouncedSearchText)[1]}
      </button>
    </li>
  )
}

export default ListItem
