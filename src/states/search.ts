import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'
import { IItem } from 'types/search'

export interface DiseaseState {
  diseaseList: IItem[]
  debouncedText: string
  activeIndex: number
  searchText: string
  selectedSearchText: string
}

const INITIAL_STATE: DiseaseState = {
  diseaseList: [],
  debouncedText: '',
  activeIndex: -1,
  searchText: '',
  selectedSearchText: '',
}

const diseaseSlice = createSlice({
  name: 'disease',
  initialState: INITIAL_STATE,
  reducers: {
    setDiseaseList: (state: DiseaseState, action: PayloadAction<IItem[]>) => {
      state.diseaseList = action.payload
    },
    setDebouncedText: (state: DiseaseState, action: PayloadAction<string>) => {
      state.debouncedText = action.payload
    },
    setActiveIndex: (state: DiseaseState, action: PayloadAction<number>) => {
      state.activeIndex = action.payload
    },
    setSearchText: (state: DiseaseState, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
    setSelectedSearchText: (state: DiseaseState, action: PayloadAction<string>) => {
      state.selectedSearchText = action.payload
    },
  },
})

export const { setDiseaseList, setDebouncedText, setActiveIndex, setSearchText, setSelectedSearchText } =
  diseaseSlice.actions

export default diseaseSlice.reducer

// Selector =====================

export const getDiseaseList = (state: RootState): IItem[] => state.disease.diseaseList
export const getDebouncedText = (state: RootState): string => state.disease.debouncedText
export const getActiveIndex = (state: RootState): number => state.disease.activeIndex
export const getSearchText = (state: RootState): string => state.disease.searchText
export const getSelectedSearchText = (state: RootState): string => state.disease.selectedSearchText
