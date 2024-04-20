import { createSlice } from '@reduxjs/toolkit'

import { rejectedPayloadHandle } from '@/shared/api/rejectedPayloadHandle'
// import { apiErrorIdentify } from '@/shared/api/apiErrorIdentify';
// import { ApiError, ApiErrorTypes, ApiRoutes } from '@/shared/api/types';
import { REDUCER_CATEGORY } from '@/shared/constants/constants'

import { getCategoryCard } from './getCategoryCard'
// import { TCategory } from '../../models/CategoryModel';
import { ICategorySchema } from './types'

const initialState: ICategorySchema = {
  isLoading: false,
  category: {
    name: '',
    count: 0,
    next: '',
    previous: '',
    results: []
  }
}

export const categoriesProductsSlice = createSlice({
  name: REDUCER_CATEGORY,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategoryCard.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getCategoryCard.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.category = payload
      })
      .addCase(getCategoryCard.rejected, (state, { payload }) => {
        state.isLoading = false
        if (payload !== null && typeof payload === 'object') {
          state.error = rejectedPayloadHandle(payload)
        } else {
          state.error = null // обработка для случая, когда payload === null
        }
      })
  }
})

// Экспортируем редуктор среза
export const { actions: categoriesActions, reducer: categoriesProductsReducer } = categoriesProductsSlice
