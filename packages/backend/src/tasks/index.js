import { database as databaseFunction } from 'firebase-functions';
import { database as databaseAdmin } from 'firebase-admin';
import { DELETE, SUBMIT } from '@the-source-of-truth/shared/constants';
import handlePhaseChange from '../documents/handlePhaseChange';

const handleFailure = (error, docRef) => {
  const errorObj = {};
  ['code', 'message', 'stack'].forEach((key) => {
    const val = error[key];
    if (val) {
      errorObj[key] = val;
    }
  });
  return docRef.update({
    error: errorObj,
  });
};

const finish = (docRef, context) => docRef
  .update({
    completedTime: new Date(databaseAdmin.ServerValue.TIMESTAMP),
    startTime: new Date(Date.parse(context.timestamp)),
  });

const handleTask = databaseFunction
  .ref('/tasks/{task}')
  .onCreate((snapshot, context) => {
    const taskId = context.params.task;
    const { payload, type } = snapshot.val();
    const docRef = databaseAdmin().ref(`/tasks/${taskId}`);
    if (type === SUBMIT || type === DELETE) {
      return handlePhaseChange(type, payload, context)
        .catch(error => handleFailure(error, docRef))
        .finally(() => finish(docRef, context));
    }
    return null;
  });

export default handleTask;
