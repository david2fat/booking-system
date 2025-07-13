import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Store {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  business_hours: string;
  is_active: boolean;
}

interface StoreState {
  stores: Store[];
  loading: boolean;
  error: string | null;
}

const initialState: StoreState = {
  stores: [],
  loading: false,
  error: null,
};

export const fetchStores = createAsyncThunk(
  'store/fetchStores',
  async () => {
    const response = await axios.get('/api/v1/stores/');
    return response.data;
  }
);

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '取得店舖失敗';
      });
  },
});

export const { clearError } = storeSlice.actions;
export default storeSlice.reducer; 