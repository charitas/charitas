export const getCollection = (url) => {
  if (url.includes('journals')) {
    return 'journals';
  }
  return '';
};

export const getDocumentId = (id) => {
  if (id === 'create') {
    return '';
  }
  return id;
};
