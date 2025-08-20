import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  signUp as signUpApi,
  logIn as logInApi,
  getUser as getUserApi,
  updateUser as updateUserApi,
} from "http/user";
import { supabase } from "core/supabase";
import { SignupData, LoginData } from "./types";

const SET_ERROR = "user/SET_ERROR";
const SIGN_UP = "user/SIGN_UP";
const LOG_IN = "user/LOG_IN";
const LOGOUT = "user/LOGOUT";
const GET_USER = "user/GET_USER";
const UPDATE_USER = "user/UPDATE_USER";

export const setError = createAction<boolean | string>(SET_ERROR);

export const signUp = createAsyncThunk<any, SignupData>(
  SIGN_UP,
  async (data) => {
    const res = await signUpApi(data);

    return res;
  }
);

export const logIn = createAsyncThunk<any, LoginData>(LOG_IN, async (data) => {
  const authSession = await logInApi(data);

  return authSession;
});

export const logOut = createAsyncThunk(LOGOUT, async () => {
  await supabase.auth.signOut();

  return true;
});

export const getUser = createAsyncThunk<any>(GET_USER, async () => {
  const user = await getUserApi();

  return user;
});

export const updateUser = createAsyncThunk<any, any>(
  UPDATE_USER,
  async (data) => {
    const res = await updateUserApi(data);

    return res;
  }
);
