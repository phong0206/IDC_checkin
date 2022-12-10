/* eslint-disable no-console */
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

export function wait(timeout: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

// export function logger(msg: any, isWarning?: boolean, params?: any): void {
//   if (__DEV__ && !isWarning) {
//     if (params) console.log(msg, params);
//     else console.log(msg);
//   }
//   if (__DEV__ && isWarning) {
//     if (params) console.warn(msg, params);
//     else console.warn(msg);
//   }
// }

export function generatePersistConfig(key: string, whitelist: string[]) {
  return {
    key,
    whitelist,
    version: 1,
    storage: storage,
    stateReconciler: autoMergeLevel2,
  };
}
