import * as admin from 'firebase-admin';
import { config } from 'firebase-functions';

admin.initializeApp(config().firebase);

export * from './src/permissions';
export { default as handleSubmit } from './src/journal/handleSubmit';
