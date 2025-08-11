import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { state } from "./store/store";
import AppRouter from "./router/AppRouter";

export default function App() {
  const { dark } = useSnapshot(state);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return <AppRouter />;
}
