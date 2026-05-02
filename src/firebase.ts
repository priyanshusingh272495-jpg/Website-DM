import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCHymPnnaFDEb-bBHk4cNnWN7aqZ4g-WQc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "assesment-9f845.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "assesment-9f845",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "assesment-9f845.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "383708447107",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:383708447107:web:980fc19d350dbca4b4b6b6",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-81XPNS1D42"
};

const app = initializeApp(firebaseConfig);

// Initialize analytics only if supported (prevents errors in some environments)
isSupported().then(supported => {
  if (supported) {
    getAnalytics(app);
  }
});

export const db = getFirestore(app);
export const auth = getAuth();

// Validate Connection to Firestore
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase connection established successfully.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration or internet connection.');
    } else {
      console.error('Error connecting to Firebase:', error);
    }
  }
}

testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
