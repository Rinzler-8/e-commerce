import { lazy } from "react";

export function lazyLoad(path, namedExport) {
  return lazy(() => {
    const promise = import(path);
    if (namedExport == null) {
      return promise;
    } else {
      console.log("else ", namedExport);

      return promise.then((module) => ({ default: module[namedExport] }));
    }
  });
}
