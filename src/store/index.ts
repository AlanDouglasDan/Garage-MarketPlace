import { configureStore, EnhancedStore, Middleware } from "@reduxjs/toolkit";

import rootReducer from "./reducers";
import { Actions, RootState } from "./types";

declare const module: any;

const configureAppStore = (
  preloadedState?: RootState
): EnhancedStore<RootState, Actions> => {
  const devMiddlewares: Middleware[] = [];

  if (process.env.NODE_ENV === "development") {
    const { createLogger } = require("redux-logger");
    
    const logger = createLogger({
      duration: false,
      timestamp: false,
      logErrors: true,
      collapsed: (_, __, logEntry) => !logEntry.error,
      colors: false,
      logger: {
        log: (message: string) => {
          if (typeof message === 'string') {
            console.log(message.replace(/%c/g, ''));
          } else {
            console.log(message);
          }
        },
        error: (message: string) => {
          if (typeof message === 'string') {
            console.error(message.replace(/%c/g, ''));
          } else {
            console.error(message);
          }
        },
      },
    });

    devMiddlewares.push(logger);
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(devMiddlewares),
    preloadedState,
    // enhancers: [],
    devTools: __DEV__,
  });

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
};

export const store = configureAppStore();
