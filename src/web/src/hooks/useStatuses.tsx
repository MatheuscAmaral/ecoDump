import api from "@/api";
import { useQuery } from "@tanstack/react-query";

const getStatuses = async () => {
  const response = await api.get("/statuses");
  return response.data;
};

export const useStatuses = () => {
  const { data: statuses, isLoading, isError } = useQuery({ queryKey: ["statuses"], queryFn: getStatuses });
  return { statuses, isLoading, isError };
};
