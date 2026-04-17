import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Import the auto-generated config
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use the custom database ID from the config if available
const dbId = firebaseConfig.firestoreDatabaseId || '(default)';
export const db = getFirestore(app, dbId);

export const googleProvider = new GoogleAuthProvider();

// Validation connection as per directive
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'system_check', 'connection'));
  } catch (error) {
    if (error && error.message && error.message.includes('permission-denied')) {
        // This is fine, it means we connected but were denied access (normal for initial rules)
        console.log("Firestore connection verified (Security rules active)");
    } else if (error && error.message && error.message.includes('offline')) {
      console.error("Please check your Firebase configuration. The client appears offline.");
    }
  }
}

testConnection();

export { signInWithPopup, signOut };
