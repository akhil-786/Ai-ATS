'use client';

import {
  getAuth,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import { app } from './config';

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export function onAuthStateChanged(callback: (user: User | null) => void) {
  return onFirebaseAuthStateChanged(auth, callback);
}

export function signUpWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function signOut() {
  return firebaseSignOut(auth);
}
