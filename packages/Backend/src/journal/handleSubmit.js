import { firestore as firestoreFunction } from 'firebase-functions';
import { database, firestore as firestoreAdmin } from 'firebase-admin';
import { BACKUP_REALTIME_DATABASE_ID, CHANGING_PHASE, CREATE, EDIT, JOURNAL_BACKUPS, JOURNALS, PHASES, PUBLISHED, REALTIME_DATABASE_ID } from '../constants';
import PromiseFirepad from './PromiseFirepad';

const phaseOrder = [CREATE, EDIT, PUBLISHED];
const getNextPhase = currentPhase => phaseOrder[phaseOrder.findIndex(p => p === currentPhase) + 1];

const createRealtimeDatabaseBackup = refToBackup => new Promise((resolve, reject) => {
  refToBackup.once('value', (snapshot) => {
    const newRef = database().ref(JOURNAL_BACKUPS).push();
    return newRef.set(snapshot.val()).then(() => resolve(newRef));
  }, (error) => {
    reject(error);
  });
});

const handleSubmit = firestoreFunction
  .document(`${JOURNALS}/{journalId}`)
  .onUpdate((change, context) => {
    const beforeChangingPhase = change.before.data()[CHANGING_PHASE];
    const afterChangingPhase = change.after.data()[CHANGING_PHASE];
    const isChangingPhase = !beforeChangingPhase && afterChangingPhase;
    if (isChangingPhase) {
      const prevPhase = change.before.data().phase;
      const nextPhase = getNextPhase(prevPhase);
      const realTimeId = change.after.data()[REALTIME_DATABASE_ID];
      const currentRef = database().ref(JOURNALS).child(realTimeId);
      const pageRefFirepad = new PromiseFirepad(currentRef);

      return Promise.all([
        pageRefFirepad.getHtml(),
        pageRefFirepad.getText(),
        createRealtimeDatabaseBackup(currentRef),
      ]).then(([html, text, backupRef]) => {
        const primaryDoc = firestoreAdmin()
          .collection(JOURNALS)
          .doc(context.params.journalId);
        return Promise.all([
          currentRef.update({ phase: nextPhase }),
          primaryDoc
            .update({
              phase: nextPhase,
              changingPhase: false,
            }),
          primaryDoc
            .collection(PHASES)
            .doc(prevPhase)
            .set({
              html,
              text,
              [BACKUP_REALTIME_DATABASE_ID]: backupRef.key,
            }, { merge: true }),
        ]);
      });
    }
    return null;
  });

export default handleSubmit;
