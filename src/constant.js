export const UserActionType = {
    CREATE_USER: 'user/create/user',
    CREATE_USER_COMPLETED: 'user/create/user/complete',
    LOGIN: 'user/login',
    LOGIN_COMPLETED: 'user/login/completed',
    LOGIN_ERROR: 'user/login/error',
    GET_USER: 'get/current/user'
};

export const RoomCreationActionType = {
    CREATE_ROOM: 'create/new/room',
    JOIN_ROOM: 'join/existing/room',
    SOMEONE_JOINED: 'joined/new/user'
};

export const SocketActionType = {
    JOIN: 'join_editor',
    SOMEONE_JOINED: 'new/join',
    JOIN_COMPLETED: 'join/completed',
    CONNECTION: 'connection',
    CODE_CHANGE: 'code-change',
    SYNC_CODE: 'sync-code',
    LEAVE: 'leave',
    FAILED: 'failed',
    DISCONNECTED: 'disconnected',
    DISCONNECTING: 'disconnecting'
};

