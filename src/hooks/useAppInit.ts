import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { useAppStore } from '../store/useAppStore';

export function useAppInit() {
  const [isReady, setIsReady] = useState(false);
  const setInitialData = useAppStore((state) => state.setInitialData);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // 1. Fetch User Role/Desk
          const userSnap = await getDoc(doc(db, 'users', user.uid));
          const userData = userSnap.data() || {};

          // 2. Fetch Global Catalog
          const globalSnap = await getDoc(doc(db, 'global', 'settings'));
          const globalData = globalSnap.data() || {};

          // 3. Sync to Store (The Mobile "Brain")
          setInitialData({
            user,
            role: userData.role || 'user',
            currentDeskId: userData.assignedDeskId || null,
            globalCatalog: globalData.catalog || {},
          });
        } catch (error) {
          console.error("Initialization Failed:", error);
        }
      }
      setIsReady(true);
    });

    return () => unsubscribe();
  }, []);

  return isReady;
}