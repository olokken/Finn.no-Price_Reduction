const favoriteReducer = (state: string[] = [], action: any) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((fav) => fav != action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

export default favoriteReducer;
