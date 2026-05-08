import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { useAppStore } from '../store/useAppStore';

export function useAppInit() {
  const [isReady, setIsReady] = useState(false);
  const { setInitialData, setUser } = useAppStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userSnap.data() || {};
          
          setInitialData({
            user: firebaseUser,
            role: userData.role || 'user',
            currentDeskId: userData.assignedDeskId || null,
          });
        } catch (error) {
          console.error("Init Error:", error);
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