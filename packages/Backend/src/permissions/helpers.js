import * as admin from 'firebase-admin';
import { permissionConstants, PERMISSIONS, USER_ID } from './constants';

export const validateClaims = (claims = {}) =>
  Object.keys(claims).reduce((acc, claim) => {
    const claimValue = claims[claim];
    const formattedClaim = claim.toLowerCase().trim();
    const valueIsValid = (claimValue === true || claimValue === false);
    const keyIsValid = !!permissionConstants[formattedClaim];
    if (keyIsValid && valueIsValid) {
      acc[formattedClaim] = claimValue;
      return acc;
    }
    // eslint-disable-next-line no-console
    console.error(`claim {${claim}: ${claimValue}} is invalid, skipped adding it to users claims. Key should be one of these: ${Object.keys(permissionConstants)}. Value should be true or false.`);
    return acc;
  }, {});

export function setClaims(newCustomClaims, context) {
  const id = context.params[USER_ID];
  const db = admin.firestore();
  return admin.auth().getUser(id).then((user) => {
    const currentCustomClaims = user.customClaims;
    return admin.auth().setCustomUserClaims(
      id,
      Object.assign({}, currentCustomClaims, validateClaims(newCustomClaims)),
    );
  }).then(() => {
    const userDoc = db.collection('users').doc(id);
    return userDoc.set({
      permissionsTimestamp: new Date(),
    }, { merge: true });
  })
    .catch((err) => {
      const errMessage = err instanceof Error ? err : new Error(err);
      // eslint-disable-next-line no-console
      console.error(errMessage);
      if (err.code === 'auth/user-not-found') {
        return db.collection(PERMISSIONS).doc(id).delete();
      }
      return null;
    });
}
