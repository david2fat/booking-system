import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Booking {
  id: number;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  total_amount: number;
  service: {
    name: string;
    price: number;
  };
  store: {
    name: string;
    address: string;
  };
}

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

export const fetchBookings = createAsyncThunk(
  'booking/fetchBookings',
  async () => {
    const response = await axios.get('/api/v1/bookings/');
    return response.data;
  }
);

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData: any) => {
    const response = await axios.post('/api/v1/bookings/', bookingData);
    return response.data;
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '取得預約失敗';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      });
  },
});

export const { clearError } = bookingSlice.actions;
export default bookingSlice.reducer; 