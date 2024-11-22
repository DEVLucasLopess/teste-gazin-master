import { createContext, useCallback, useState, useContext } from "react";
import { ReactNode } from "react";

interface IDrawerOption {
    icon: string;
    label: string;
    path: string;
    onClick: (() => void) | undefined;
}

interface IDrawerContextData {
    drawerOptions: IDrawerOption[];
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
}

interface DrawerProviderProps {
  children: ReactNode;
}

export const AppDrawerProvider = ({ children }: DrawerProviderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);  

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions: handleSetDrawerOptions }}>
        { children }
    </DrawerContext.Provider>
  );
};
