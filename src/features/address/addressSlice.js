/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ALL_APi_LIST } from "../../api/apiList";

// =================== FETCH USER ADDRESSES =====================
export const fetchAddressesAPI = createAsyncThunk(
  "address/fetchAddressesAPI",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No token");

      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.userAddress}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data);

      return data.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

// =================== ADD USER ADDRESS =====================
export const addAddressAPI = createAsyncThunk(
  "address/addAddressAPI",
  async (payload, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No token");

      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.userAddressSave}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data);

      return data.data; // newly added address
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

// =================== REMOVE USER ADDRESS =====================
export const removeAddressAPI = createAsyncThunk(
  "address/removeAddressAPI",
  async (addressId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No token");

      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.removeAdd}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: addressId }),
      });

      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data);

      return addressId; // return removed id
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

// =================== SLICE =====================
const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchAddressesAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAddressesAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload?.addresses || [];
        state.states = action.payload?.list_of_states || [];
        state.country = action.payload?.country || null;
      })

      .addCase(fetchAddressesAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addAddressAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddressAPI.fulfilled, (state, action) => {
        state.loading = false;

        // make others non-primary
        state.addresses = state.addresses.map((addr) => ({
          ...addr,
          primary: false,
        }));

        // add new primary address
        state.addresses.unshift(action.payload);
      })
      .addCase(addAddressAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // remove
      .addCase(removeAddressAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeAddressAPI.fulfilled, (state, action) => {
        state.loading = false;

        // remove address from list
        state.addresses = state.addresses.filter(
          (addr) => addr.id !== action.payload
        );

        // if removed address was primary, set new primary
        if (!state.addresses.some((addr) => addr.primary)) {
          if (state.addresses.length > 0) {
            state.addresses[0].primary = true;
          }
        }
      })
      .addCase(removeAddressAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
