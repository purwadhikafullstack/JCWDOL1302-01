'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store, AppStore } from '../lib/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /*
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  */

  return <Provider store={store}>{children}</Provider>;
}
