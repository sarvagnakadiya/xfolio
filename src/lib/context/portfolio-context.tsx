import { createContext, useContext, useState, useEffect } from 'react';

type PortfolioContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const PortfolioContext = createContext<PortfolioContextType | null>(
  null
);

type PortfolioContextProviderProps = {
  children: React.ReactNode;
};

export function PortfolioContextProvider({
  children
}: PortfolioContextProviderProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('about');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return a stable default value during SSR
  if (!isClient) {
    return (
      <PortfolioContext.Provider
        value={{
          activeTab: 'about',
          setActiveTab: () => {
            /* SSR placeholder */
          }
        }}
      >
        {children}
      </PortfolioContext.Provider>
    );
  }

  return (
    <PortfolioContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioContextType {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      'usePortfolio must be used within a PortfolioContextProvider'
    );
  }

  return context;
}
