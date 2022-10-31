import { useCallback, useState } from 'react';

type UseToggleReturnType = [boolean, (nv?: boolean) => void];

const useToggle = (initialState: boolean = false): UseToggleReturnType => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

export default useToggle;
