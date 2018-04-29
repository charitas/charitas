import { firestore } from 'firebase-functions';
import { DOC_PATH } from './constants';
import { setClaims } from './helpers';

const deletePermissions = firestore
  .document(DOC_PATH)
  .onDelete((snapshot, context) =>
    setClaims({ editor: false, author: false }, context));

export default deletePermissions;
