import { useState } from 'react';

interface HidePassword {
  onPressHidePassword: () => void;
  hidePassword: boolean;
}

const useHidePassword = (): HidePassword => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const onPressHidePassword = () => setHidePassword(!hidePassword);
  return {
    onPressHidePassword,
    hidePassword
  };
};
export default useHidePassword;
