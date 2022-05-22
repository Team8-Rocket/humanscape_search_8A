import { Dispatch, SetStateAction } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { useState, useEffect, useRef } from 'hooks'
import ListItem from './ListItem'
import { IItem } from '../../types/search.d'
import styles from './List.module.scss'

interface Props {
  data: IItem[] | undefined | void
  // setIsOpen: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
}

const List = ({ data, isLoading }: Props): JSX.Element | null => {
  // const divRef = useRef<HTMLDivElement>(null)

  // const clickOutside = (event: MouseEvent) => {
  //   if (!divRef.current?.contains(event.target as Node)) {
  //     setIsOpen(false)
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('mousedown', clickOutside)

  //   return () => {
  //     document.removeEventListener('mousedown', clickOutside)
  //   }
  // })

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
