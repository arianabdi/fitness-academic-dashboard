const initialState = {
  userId: null,
  email: null,
  fullname: null,
  roles: null,
  username: null,
  group: null,
  recentMessage: null
};

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        userId: action.user.id,
        email: action.user.email,
        fullname: action.user.userNumber,
        username: action.user.username,
        roles: action.user.roles,
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

export default ProfileReducer;
