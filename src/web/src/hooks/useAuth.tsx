import { useQuery } from "@tanstack/react-query"

const getUser = async () => {
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user || "{}");
  
  return typeof parsedUser === 'object' && parsedUser !== null ? parsedUser : {};
}

export const useAuth = () => {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return { user: user.data }
}