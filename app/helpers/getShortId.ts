const getShortId = (id: string) => {
  const length = id.length;
  return id.substring(length - 6, length);
};

export default getShortId;
