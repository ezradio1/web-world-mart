import axios from "axios";

const usePostData = () => {
  const postData = async <T extends unknown>(url: string, payload: T) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        payload
      );
      return { data: response.data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  };

  return postData;
};

export default usePostData;
