export const INTERNAL_SERVER_ERROR = 'Internal Server Error';

{/** user controller getAllUsers */}
export const GET_ALL_USERS_MESSAGE = 'Failed to get users'
export const GET_ALL_USERS_METHOD = 'UserController.getAllUsers'

{/** user controller createNewUser */}
export const CREATE_NEW_USER_MESSAGE = 'Invalid user data received'
export const CREATE_NEW_USER_METHOD  = 'UserController.createNewUser'

export const CREATE_NEW_USER_MESSAGE_ERROR = 'Failed to create user'


{/** user controller update user */}

export const UPDATE_USER_MESSAGE_ERROR = 'Failed to update user'
export const UPDATE_USER_METHOD = 'UserController.updateUser'

{/** user controller delete user */}
export const DELETE_USER_MESSAGE_ERROR = 'Failed to delete user'
export const DELETE_USER_METHOD = 'UserController.deleteUser'


{/** user service create new User */}
export const DUPLICATE_USERNAME_MESSAGE = 'Duplicate username'
export const DUPLICATE_USERNAME_METHOD = 'UserService.createNewUser'

{/** user service update user */}
export const USER_NOT_FOUND_MESSAGE = 'User not found'
export const SERVICE_UPDATE_USER_METHOD = 'UserService.updateUser'

{/** user service delete user */}
export const USER_HAS_ASSIGNED_NOTES_MESSAGE = 'User has assigned notes'
export const SERVICE_DELETE_USER_METHOD = 'UserService.deleteUser'

{/** note controller getAllNotes  */}
export const GET_ALL_NOTES_MESSAGE = 'Failed to get notes'
export const GET_ALL_NOTES_METHOD = 'NoteController.getAllNotes'

{/** note controller createNewNote */}
export const CREATE_NEW_NOTE_MESSAGE = 'Failed to create note'
export const CREATE_NEW_NOTE_METHOD = 'NoteController.createNewNote'

{/** note controller updateNote */}
export const UPDATE_NOTE_MESSAGE = 'Failed to update note'
export const UPDATE_NOTE_METHOD = 'NoteController.updateNote'

{/** note controller deleteNote */}
export const DELETE_NOTE_MESSAGE = 'Failed to delete note'
export const DELETE_NOTE_METHOD = 'NoteController.deleteNote'

{/**  note service getAllNotes */}
export const SERVICE_GET_ALL_NOTES_METHOD = 'NoteService.getAllNotes'

{/** note service getNote */}
export const NOTE_DOES_NOT_EXIST_MESSAGE = 'Note with this ID does not exist.'
export const SERVICE_GET_NOTE_METHOD = 'NoteService.getNote'

{/** note service createNote*/}
export const DUPLICATE_NOTE_TITLE = 'Duplicate note title'
export const DUPLICATE_NOTE_TITLE_METHOD = 'NoteService.createNote'

{/** note service updateNote */}
export const NOTE_NOT_FOUND_MESSAGE = 'Note not found'
export const SERVICE_UPDATE_NOTE = 'noteService.updateNote'

export const SERVICE_DELETE_NOTE_METHOD = 'NoteService.deleteNote'

{/** cors option config */}

export const CORS_NOT_ALLOWED = 'Origin is not allowed by CORS policy'
export const CORS_METHOD = 'corsOptions'