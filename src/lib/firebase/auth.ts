'use client';

import {
  getAuth,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  type User,
} from 'firebase/auth';
import { app } from './config';

export const auth = getAuth(app);

export function onAuthStateChanged(callback: (user: User | null) => void) {
  return onFirebaseAuthStateChanged(auth, callback);
}
