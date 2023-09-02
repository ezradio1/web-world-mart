import axios from "axios";

const useDeleteData = () => {
  const deleteData = async (url: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`
      );
      return { data: response.data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.message,
      };
    }
  };

  return deleteData;
};

export default useDeleteData;
