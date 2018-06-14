import { database } from 'firebase-admin';
import { APPROVE, CHANGING_PHASE, CREATE, DELETE, DELETED, DOCUMENTS, DOCUMENT_BACKUPS, EDIT, PUBLISHED } from '@the-source-of-truth/shared/constants';
import { checkPermissions } from '@the-source-of-truth/shared/helpers';
import PromiseFirepad from './PromiseFirepad';

const phaseOrder = [CREATE, EDIT, APPROVE, PUBLISHED];
const getNextPhase = currentPhase => phaseOrder[phaseOrder.findIndex(p => p === currentPhase) + 1];

const createBackup = refToBackup =>
  refToBackup.once('value')
    .then((snapshot) => {
      const newRef = database().ref(DOCUMENT_BACKUPS).push();
      return Promise.all([
        newRef,
        newRef
          .set(snapshot.val()),
      ]);
    })
    .then(([newRef]) => newRef)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });

const handlePhaseChange = (type, payload, context) => {
  const ref = database().ref(DOCUMENTS).child(payload.id);
  return ref.once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      const prevPhase = data.phase;
      const { time } = data;
      const isAllowed = checkPermissions(context.auth.token, prevPhase);
      if (isAllowed) {
        const pageRefFirepad = new PromiseFirepad(ref);
        return Promise.all([
          pageRefFirepad.getHtml(),
          pageRefFirepad.getText(),
          createBackup(ref),
          prevPhase,
          time,
        ]);
      }
      throw new Error('Insufficient permissions for this task');
    })
    .then(([html, text, backupRef, prevPhase, time]) => {
      const nextPhase = type === DELETE ? DELETED : getNextPhase(prevPhase);
      return ref.update({
        phase: nextPhase,
        time: { ...time, [nextPhase]: database.ServerValue.TIMESTAMP },
        [CHANGING_PHASE]: false,
        [`${prevPhase}PhaseBackup`]: {
          id: backupRef.key,
          html,
          text,
        },
      });
    });
};

export default handlePhaseChange;
