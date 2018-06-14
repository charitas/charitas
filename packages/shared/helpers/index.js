import { APPROVE, CREATE, EDIT } from '../constants';

export const checkPermissions = (claims, phase) =>
  (claims.author && phase === CREATE) ||
  (claims.editor && phase === EDIT) ||
  (claims.approver && phase === APPROVE);

export const checkDeletePermissions = (claims, phase) =>
  (claims.author && phase === CREATE) ||
  (claims.approver && phase === APPROVE);
