const initialState = {
  userId: null,
  email: null,
  fullname: null,
  group: null,
  recentMessage: null
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        userId: action.user.id,
        email: action.user.email,
        fullname: action.user.userNumber,
        group: action.user.group
      };
      case 'SET_RECENT_MESSAGE':
      return {
        ...state,
        recentMessage: action.recentMessage,
      };
    // Other cases for authentication-related actions
    default:
      return state;
  }
};

export default UserReducer;
