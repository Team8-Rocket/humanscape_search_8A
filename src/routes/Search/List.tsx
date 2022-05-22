import { TailSpin } from 'react-loader-spinner'

import ListItem from './ListItem'

import { IItem } from '../../types/search.d'
import styles from './List.module.scss'

interface Props {
  data: IItem[] | undefined | void
  isLoading: boolean
}

const List = ({ data, isLoading }: Props): JSX.Element | null => {
  const resultMessage = !data ? '검색 결과가 없습니다' : '추천 검색어'
  return (
    <div className={styles.dropdown}>
      {isLoading && <TailSpin wrapperClass={styles.loading} color='#347ae1' height={40} width={40} />}
      {!isLoading && <span>{resultMessage}</span>}
      <ul>
        {data?.map((diseaseItem, ListItemIndex) => (
          <ListItem key={diseaseItem.sickCd} ListItemIndex={ListItemIndex} diseaseItem={diseaseItem} />
        ))}
      </ul>
    </div>
  )
}

export default List
