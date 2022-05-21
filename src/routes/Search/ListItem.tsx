import { IItem } from '../../types/search.d'

import styles from './list.module.scss'
import { SearchIcon } from 'assets/svgs'
import { useAppDispatch, useAppSelector } from 'hooks'
import classNames from 'classnames'
import { setActiveIndex, setSearchText } from 'states/search'

interface Props {
  diseaseItem: IItem
  ListItemIndex: number
}

const ListItem = ({ diseaseItem, ListItemIndex }: Props): JSX.Element | null => {
  const debouncedSearchText = useAppSelector((state) => state.disease.debouncedText)
  const activeIndex = useAppSelector((state) => state.disease.activeIndex)
  const dispatch = useAppDispatch()

  const handleActiveIndex = () => {
    dispatch(setActiveIndex(ListItemIndex))
  }

  const itemsButtonClick = (item: string) => dispatch(setSearchText(item))

  return (
    <li className={classNames({ [styles.active]: ListItemIndex === activeIndex })}>
      <SearchIcon className={styles.searchIcon} />
      <button
        onMouseOver={handleActiveIndex}
        onFocus={handleActiveIndex}
        onClick={() => itemsButtonClick(diseaseItem.sickNm)}
        type='button'
      >
        {diseaseItem.sickNm.split(debouncedSearchText)[0]}
        <b className={styles.highlight}>{debouncedSearchText}</b>
        {diseaseItem.sickNm.split(debouncedSearchText)[1]}
      </button>
    </li>
  )
}

export default ListItem
