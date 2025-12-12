/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ALL_APi_LIST } from "../../api/apiList";

// =================== LOGIN (SEND OTP) =====================
export const loginAPI = createAsyncThunk(
  "auth/loginAPI",
  async ({ email }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const response = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(response);

      return {
        email,
        hash: response.data?.hash,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

// =================== VERIFY OTP + REFRESH TOKEN =====================
export const verifyOtpAPI = createAsyncThunk(
  "auth/verifyOtpAPI",
  async ({ otp }, thunkAPI) => {
    try {
      const { email, hash } = thunkAPI.getState().auth;
      if (!email || !hash)
        return thunkAPI.rejectWithValue("Missing email or hash");

      // 1️⃣ Verify OTP
      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.register}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, hash }),
      });

      const response = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(response);

      const loginToken = response.data?.token;
      if (!loginToken)
        return thunkAPI.rejectWithValue("No login token received");

      // 2️⃣ Refresh Token
      const refreshRes = await fetch(
        `${BASE_URL}${ALL_APi_LIST.refreshtoken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: loginToken }),
        }
      );

      const refreshData = await refreshRes.json();
      if (!refreshRes.ok) return thunkAPI.rejectWithValue(refreshData);

      const finalToken = refreshData.data?.refresh_token;
      if (!finalToken)
        return thunkAPI.rejectWithValue(
          "Refresh token API did not return a token"
        );

      // Store real usable token
      localStorage.setItem("token", finalToken);

      return { token: finalToken };
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

// =================== FETCH USER PROFILE =====================
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No token found");

      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.userProfile}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const raw = await res.text();
      console.log("USER PROFILE RAW RESPONSE:", raw);

      let json;
      try {
        json = JSON.parse(raw);
      } catch (error) {
        return thunkAPI.rejectWithValue("Invalid JSON received");
      }

      if (!res.ok) return thunkAPI.rejectWithValue(json);

      return json.data?.user || json.data || json.user;
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

// =================== SLICE =====================
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!localStorage.getItem("token"),
    email: null,
    hash: null,
    user: null,
    loading: false,
    error: null,
    needOtp: false,
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.user = null;
      state.email = null;
      state.hash = null;
      state.needOtp = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.needOtp = true;
        state.email = action.payload.email;
        state.hash = action.payload.hash;
      })
      .addCase(loginAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      .addCase(verifyOtpAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpAPI.fulfilled, (state) => {
        state.loading = false;
        state.needOtp = false;
        state.isLoggedIn = true;
      })
      .addCase(verifyOtpAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Profile fetch failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
