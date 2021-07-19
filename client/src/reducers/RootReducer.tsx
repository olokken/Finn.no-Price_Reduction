import { combineReducers } from 'redux';
import favoriteReducer from './FavoriteReducer';

const rootReducer = combineReducers({
  favorites: favoriteReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
