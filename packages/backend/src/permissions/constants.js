const author = 'author';
const editor = 'editor';
const approver = 'approver';

export const permissionConstants = {
  author,
  editor,
  approver,
};

export const PERMISSIONS = 'permissions';
export const USER_ID = 'userId';
export const DOC_PATH = `${PERMISSIONS}/{${USER_ID}}`;
