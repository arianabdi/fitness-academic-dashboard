// actions/authActions.js
export const setProfile = (user) => ({
    type: 'SET_PROFILE',
    user,
});

export const clearProfile = () => ({
    type: 'SET_PROFILE',
    user: {
        id: null,
        email: null,
        userNumber: null,
        roles: null,
        username: null,
        groupName: null
    },
});

export const setRecentMessages = (recentMessage) => ({
    type: 'SET_RECENT_MESSAGE',
    recentMessage: recentMessage
});
