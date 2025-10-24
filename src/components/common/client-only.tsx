import { useState, useEffect } from 'react';

type ClientOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function ClientOnly({
  children,
  fallback = null
}: ClientOnlyProps): JSX.Element {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return <>{fallback}</>;

  return <>{children}</>;
}
