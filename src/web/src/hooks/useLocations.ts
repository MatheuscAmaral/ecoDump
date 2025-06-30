import api from "@/api";
import { useQuery } from "@tanstack/react-query";

const getLocations = async () => {
  const response = await api.get('/locations');
  return response.data;
}

export const useLocations = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['locations'], queryFn: getLocations })
  return { locations: data, isLoading, isError }
}