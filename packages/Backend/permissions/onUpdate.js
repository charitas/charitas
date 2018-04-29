import { firestore } from 'firebase-functions';
import { DOC_PATH } from './constants';
import { setClaims } from './helpers';

const updatePermissions = firestore
  .document(DOC_PATH)
  .onUpdate((change, context) => {
    const snapshot = change.after;
    return setClaims(snapshot.data(), context);
  });

export default updatePermissions;
