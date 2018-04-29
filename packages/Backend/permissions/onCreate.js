import { firestore } from 'firebase-functions';
import { DOC_PATH } from './constants';
import { setClaims } from './helpers';

const createPermissions = firestore
  .document(DOC_PATH)
  .onCreate((snapshot, context) =>
    setClaims(snapshot.data(), context));

export default createPermissions;
