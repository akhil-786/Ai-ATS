// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';

// Your web app's Firebase configuration is provided by the backend
import { firebaseConfig } from '@/firebase/config';


// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
