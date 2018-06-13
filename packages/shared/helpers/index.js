import { APPROVE, CREATE, EDIT } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const checkPermissions = (claims, phase) =>
  (claims.author && phase === CREATE) ||
  (claims.editor && phase === EDIT) ||
  (claims.approver && phase === APPROVE);
