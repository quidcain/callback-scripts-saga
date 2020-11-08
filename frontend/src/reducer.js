const initialState = {
  effects: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_EFFECTS':
      return {
        ...state,
        effects: state.effects.concat(action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
