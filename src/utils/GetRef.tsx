import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function GetRef() {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        navigate('/', { replace: true });
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [navigate]);

  return ref;
}
