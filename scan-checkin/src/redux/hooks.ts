import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { store } from "./store";

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useSelectorUser = () => {
  const { user } = useSelector((state: any) => state.userInfo);
  return user || null;
};
