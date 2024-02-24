import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userId: null,
  email: null,
  password: null,
  status: "idle",
  error: null,
};

const USERS_URL = "http://localhost:3000/users";

export const postUser = createAsyncThunk(
  "signin/postUser",
  async ({ userId, email, password }, thunkAPI) => {
    try {
      const userIdResponse = await axios.get(`${USERS_URL}?userId=${userId}`);
      if (userIdResponse.data.exists) {
        throw new Error("User ID is already taken.");
      }

      const emailResponse = await axios.get(`${USERS_URL}?email=${email}`);
      if (emailResponse.data.exists) {
        throw new Error("Email is already registered.");
      }

      const responseUser = await axios.post(`${USERS_URL}?userId=${userId}`);
      const responseEmail = await axios.post(`${USERS_URL}?email=${email}`);
      const responsePassword = await axios.post(
        `${USERS_URL}?password=${password}`
      );

      return {
        userId: responseUser.data,
        email: responseEmail,
        password: responsePassword.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const signInSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    usersSingedIn: {
      reducer: (state, action) => {
        state.userId = action.payload.userId;
        state.email = action.payload.email;
        state.password = action.payload.password;
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      (postUser.fulfilled = (state, action) => {
        state.userId = action.payload.userId;
        state.email = action.payload.email;
        state.password = action.payload.password;
      })
    );
  },
});

export const { usersSingedIn } = signInSlice.actions;

export default signInSlice.reducer;
