import { graphqlClient } from "@/clients/api";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQuery, getUserByIdQuery } from "../graphql/query/user";
import { User } from "../gql/graphql";
type Userdata={
  getCurrentUser:User
}
export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphqlClient.request<Userdata>(getCurrentUserQuery),
  });
  return { ...query ,user:query.data?.getCurrentUser};
};
type UserIddata={
  getUserById :User
}

export const useGetUserById =(id: string) => {
  const query = useQuery({
    queryKey: ['userby-id', id], // Include id for unique requests
    queryFn: () => graphqlClient.request(getUserByIdQuery, { id }),
    
  });

  return { ...query, user: query.data }; // Access user data from the response

}
