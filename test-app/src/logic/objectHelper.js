export const removeNullProperties = (obj) => {
  if (obj) {
    delete obj["null"];
  }
};
