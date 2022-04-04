export const getBlob = async (uri) => {
  const respone = await fetch(uri);
  const blob = await respone.blob();
  return blob;
};
