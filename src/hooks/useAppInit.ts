import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { useAppStore } from '../store/useAppStore';

export function useAppInit() {
  const [isReady, setIsReady] = useState(false);
  const { setInitialData, setUser } = useAppStore();

  useEffect(() => {
    // This listens for the moment the user logs in
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch the user's role and desk from your EXISTING Firestore data
          const userSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userSnap.data() || {};
          
          setInitialData({
            user: firebaseUser,
            role: userData.role || 'user',
            currentDeskId: userData.assignedDeskId || null,
          });
        } catch (error) {
          console.error("Failed to sync user data from Firestore:", error);
          // Even if Firestore fails, we set the user so they aren't stuck on login
          setUser(firebaseUser); 
        }
      } else {
        setUser(null);
      }
      setIsReady(true);
    });

    return () => unsubscribe();
  }, []);

  return isReady;
}