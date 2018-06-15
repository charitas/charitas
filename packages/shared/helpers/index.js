import { APPROVE, CREATE, EDIT, PUBLISHED } from '../constants';

export const checkPermissions = (claims, phase) =>
  (claims.author && phase === CREATE) ||
  (claims.editor && phase === EDIT) ||
  (claims.approver && phase === APPROVE);

export const checkDeletePermissions = (claims, phase) =>
  (claims.author && phase === CREATE) ||
  (claims.approver && phase === APPROVE);

export const phaseOrder = [CREATE, EDIT, APPROVE, PUBLISHED];
export const getNextPhase = currentPhase =>
  phaseOrder[phaseOrder.findIndex(p => p === currentPhase) + 1];
