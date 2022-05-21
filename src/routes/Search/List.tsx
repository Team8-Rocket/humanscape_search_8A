import { TailSpin } from 'react-loader-spinner'

import ListItem from './ListItem'

import { IItem } from '../../types/search.d'

import styles from './list.module.scss'

interface Props {
  data: IItem[] | undefined | void
  isLoading: boolean
}

const List = ({ data, isLoading }: Props): JSX.Element | null => {
  const resultMessage = !data ? '검색 결과가 없습니다' : '추천 검색어'
  return (
    <ul className={styles.dropdown}>
      {isLoading && <TailSpin wrapperClass={styles.loading} color='#347ae1' height={40} width={40} />}
      {!isLoading && (
        <li>
          <span>{resultMessage}</span>
        </li>
      )}
      {data?.map((diseaseItem, ListItemIndex) => (
        <ListItem key={diseaseItem.sickCd} ListItemIndex={ListItemIndex} diseaseItem={diseaseItem} />
      ))}
    </ul>
  )
}

export default List
