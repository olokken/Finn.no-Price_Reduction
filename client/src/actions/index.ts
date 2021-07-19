export const add = (fav: string) => {
  return {
    type: 'ADD',
    payload: fav,
  };
};

export const remove = (fav: string) => {
  return {
    type: 'REMOVE',
    payload: fav,
  };
};

export const set = (fav: string[]) => {
  return {
    type: 'SET',
    payload: fav,
  };
};
