import { APIConfig, FetchUserResponse } from '@/types';

// Use case: get the jwt token when the user signs in

const fetchUser = async (url: string, config: APIConfig): Promise<FetchUserResponse> => {
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`Response failed to fetch ${response.statusText} : ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (e: any) {
    console.error(e.message);
    const errorMessage = e.message;
    return errorMessage;
  }
};

export default fetchUser;
