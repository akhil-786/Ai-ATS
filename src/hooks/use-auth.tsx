'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
  updateProfile,
} from 'firebase/auth';
import { useFirebase } from '@/firebase';
import { Loader2 } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signUpWithEmail: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
  updateUserDisplayName: (name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }: { children: ReactNode }) {
  const { auth, firestore } = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const updateUserInFirestore = async (user: User, name?: string) => {
    if (!firestore) return;
    const userRef = doc(firestore, 'users', user.uid);
    await setDoc(
      userRef,
      {
        id: user.uid,
        email: user.email,
        name: name || user.displayName || 'Anonymous User',
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Firestore document is updated on auth state change or if it doesn't exist
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateUserInFirestore(userCredential.user);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      await updateUserInFirestore(userCredential.user);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserDisplayName = async (name: string) => {
    if (user && firestore) {
      setLoading(true);
      try {
        await updateProfile(user, { displayName: name });
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, { name }, { merge: true });
        // Manually update user state to reflect change immediately
        setUser({ ...user, displayName: name });
      } finally {
        setLoading(false);
      }
    } else {
      throw new Error('User not authenticated or Firestore not available');
    }
  };

  const value = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    updateUserDisplayName,
  };

  if (loading && user === null && !auth.currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
