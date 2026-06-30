import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from '../../api/campers';

const PAGE_SIZE = 4;

export const loadCampers = createAsyncThunk(
  'campers/load',
  async ({ filters, page }, { rejectWithValue }) => {
    try {
      const params = { page, limit: PAGE_SIZE };
      if (filters.location) params.location = filters.location;
      if (filters.form) params.form = filters.form;
      // mockapi doesn't support querying nested boolean equipment fields
      // directly across multiple keys in one call, so equipment filters
      // are applied client-side in the selector layer below.
      const { items, totalCount } = await fetchCampers(params);
      return { items, totalCount, page };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load campers');
    }
  }
);

export const loadCamperDetails = createAsyncThunk(
  'campers/loadDetails',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchCamperById(id);
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load camper');
    }
  }
);

const initialState = {
  items: [],
  totalCount: 0,
  page: 1,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  details: null,
  detailsStatus: 'idle',
  detailsError: null,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    clearCampers(state) {
      state.items = [];
      state.totalCount = 0;
      state.page = 1;
      state.status = 'idle';
      state.error = null;
    },
    clearDetails(state) {
      state.details = null;
      state.detailsStatus = 'idle';
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCampers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { items, totalCount, page } = action.payload;
        state.items = page === 1 ? items : [...state.items, ...items];
        state.totalCount = totalCount;
        state.page = page;
      })
      .addCase(loadCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(loadCamperDetails.pending, (state) => {
        state.detailsStatus = 'loading';
        state.detailsError = null;
      })
      .addCase(loadCamperDetails.fulfilled, (state, action) => {
        state.detailsStatus = 'succeeded';
        state.details = action.payload;
      })
      .addCase(loadCamperDetails.rejected, (state, action) => {
        state.detailsStatus = 'failed';
        state.detailsError = action.payload || 'Something went wrong';
      });
  },
});

export const { clearCampers, clearDetails } = campersSlice.actions;
export const PAGE_LIMIT = PAGE_SIZE;
export default campersSlice.reducer;
