import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "@/api/counterAPI";
import { RootState, AppThunk } from './store';


export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount)
    return response.data
  }
)

const initialState = {
  value: 0,
  status: 'idle'
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    flash(state, action) {
      state.value = action.payload
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(incrementAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
    // .addCase(incrementAsync.rejected, (state) => {
    //   state.status = 'failed';
    // });
  }
})

export const selectCount = (state: RootState) => state.counter.value

export const incrementIfOdd = (amount: number): AppThunk =>
  (dispatch, getstate) => {
    const currentValue = selectCount(getstate())
    if (currentValue % 2 === 1) {
      dispatch(incrementAsync(amount))
    }
  }




export const { incrementByAmount, flash } = counterSlice.actions
export const counterSliceTest = counterSlice
export default counterSlice.reducer
