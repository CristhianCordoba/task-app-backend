import admin from 'firebase-admin';

const getServiceAccount = () => {
  if (process.env.FIREBASE_CONFIG) {
    return JSON.parse(process.env.FIREBASE_CONFIG) as admin.ServiceAccount;
  }
  return require('../../../serviceAccountKey.json');
};

admin.initializeApp({
  credential: admin.credential.cert(getServiceAccount()),
});

export const db = admin.firestore();