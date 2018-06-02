import { database } from 'firebase-admin';
import { CHANGING_PHASE, CREATE, EDIT, JOURNAL_BACKUPS, JOURNALS, PUBLISHED } from '../constants';
import PromiseFirepad from './PromiseFirepad';

const phaseOrder = [CREATE, EDIT, PUBLISHED];
const getNextPhase = currentPhase => phaseOrder[phaseOrder.findIndex(p => p === currentPhase) + 1];

const createBackup = refToBackup =>
  refToBackup.once('value')
    .then((snapshot) => {
      const newRef = database().ref(JOURNAL_BACKUPS).push();
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

const checkPermissions = (claims, phase) => (claims.author && phase === 'create') || (claims.editor && phase === 'edit');

const handleSubmit = (payload, context) => {
  const ref = database().ref(JOURNALS).child(payload.id);
  return ref.once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      const prevPhase = data.phase;
      const isAllowed = checkPermissions(context.auth.token, prevPhase);
      if (isAllowed) {
        const pageRefFirepad = new PromiseFirepad(ref);
        return Promise.all([
          pageRefFirepad.getHtml(),
          pageRefFirepad.getText(),
          createBackup(ref),
          prevPhase,
        ]);
      }
      throw new Error('Insufficient permissions for this task');
    })
    .then(([html, text, backupRef, prevPhase]) => {
      const nextPhase = getNextPhase(prevPhase);
      return ref.update({
        phase: nextPhase,
        [CHANGING_PHASE]: false,
        [`${prevPhase}PhaseBackup`]: {
          id: backupRef.key,
          html,
          text,
        },
      });
    });
};

export default handleSubmit;
