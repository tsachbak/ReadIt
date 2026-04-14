import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

/**
 * Subscribes to the device network state and returns the current connectivity.
 *
 * @returns `true` when online, `false` when offline, `null` while the initial
 *          state is still being determined.
 */
export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
}
