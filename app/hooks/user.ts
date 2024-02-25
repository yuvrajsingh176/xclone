import { graphqlClient } from "@/clients/api";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQuery } from "../graphql/query/user";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphqlClient.request(getCurrentUserQuery),
  });
  return { ...query ,user:query.data?.getCurrentUser};
};
