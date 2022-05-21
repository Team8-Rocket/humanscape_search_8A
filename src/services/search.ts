import axios, { CancelTokenSource } from 'axios'
import { SetStateAction } from 'react'
import { ISearchApiRes } from '../types/search.d'

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'

const SEARCH_BASE_URL = `${PROXY}/B551182/diseaseInfoService/getDissNameCodeList`

const API_KEY = process.env.REACT_APP_DISEASE_API_KEY

const getDiseasesNameOptions = {
  ServiceKey: API_KEY,
  pageNo: 1,
  sickType: 1,
  medTp: 2,
  diseaseType: 'SICK_NM',
  _type: 'json',
}

let call: CancelTokenSource
export const getDiseasesName = (
  searchText: string,
  count: number,
  setCount: { (value: SetStateAction<number>): void; (arg0: (prev: number) => number): void }
) => {
  if (call) call.cancel('cancel')
  call = axios.CancelToken.source()
  setCount((prev: number) => prev + 1)
  console.log(count + 1)
  return axios
    .get<ISearchApiRes>(SEARCH_BASE_URL, {
      cancelToken: call.token,
      params: {
        searchText,
        ...getDiseasesNameOptions,
      },
      timeout: 10000,
    })
    .then((res) => {
      const result = res?.data.response.body.items.item
      if (Array.isArray(result)) return result
      if (typeof result === 'object') return [result]
      return result
    })
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log(`%c Request ${thrown.message}`, 'background: #bd71ff; color:#eaeaea')
      }
    })
}
