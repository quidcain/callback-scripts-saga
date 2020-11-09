const initialState = {
  tasks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TASKS':
      return {
        ...state,
        ...(action.payload
          ? { tasks: state.tasks.concat(action.payload) }
          : {}),
      };
    default:
      return state;
  }
};

export default reducer;
