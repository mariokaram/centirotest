import { createContext, useContext, useState } from "react";
const LoadingContext = createContext({
  loading: false,
  setLoading: null,
});

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
}
