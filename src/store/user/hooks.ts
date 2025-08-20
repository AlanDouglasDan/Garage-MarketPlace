import { shallowEqual, useSelector } from "react-redux";

import { useActionCreator } from "hooks";
import { RootState } from "store/types";
import { UserHookReturn } from "./types";
import {
  setError,
  signUp,
  logIn,
  logOut,
  getUser,
  updateUser,
} from "./actions";

export const useUser = (): UserHookReturn => {
  const userState = useSelector((state: RootState) => state.user, shallowEqual);

  return {
    ...userState,
    setError: useActionCreator(setError),
    signUp: useActionCreator(signUp),
    logIn: useActionCreator(logIn),
    logOut: useActionCreator(logOut),
    getUser: useActionCreator(getUser),
    updateUser: useActionCreator(updateUser),
  };
};
