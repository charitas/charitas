// eslint-disable-next-line import/prefer-default-export
export const checkPermissions = (claims, phase) => (claims.author && phase === 'create') || (claims.editor && phase === 'edit');
