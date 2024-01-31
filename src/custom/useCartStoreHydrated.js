
import { useCartStore } from '@/store/CartStore';
import React, { useEffect } from 'react'

export default function useCartStoreHydrated() {
    const cartStore = useCartStore();

    useEffect(() => {
        useCartStore.persist.rehydrate();
      }, []);


  return cartStore
  
}
