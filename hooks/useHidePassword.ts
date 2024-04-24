import { useState } from 'react';

const useHidePassword = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const onPressHidePassword = () => setHidePassword(!hidePassword);
  return {
    onPressHidePassword,
    hidePassword
  };
};
export default useHidePassword;
