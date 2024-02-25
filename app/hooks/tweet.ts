        import { graphqlClient } from "@/clients/api";
        import { InvalidateQueryFilters, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
        import {  getAllTweetsQuery } from "../graphql/query/tweet";
import { CreateTweetData, Tweet } from "../gql/graphql";
import { createTweetMutation } from "../graphql/mutation/tweet";
import toast from "react-hot-toast";

        type GetAllTweetsQuery = {
            getAllTweets: Tweet[];
};
const invalidateQueryFilters: InvalidateQueryFilters = {
    queryKey: ["all-tweets"],
  
  };

export const useCreateTweet = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData) => graphqlClient.request(createTweetMutation,
            { payload }),
        onSuccess: async(payload) => {
            await queryClient.invalidateQueries(invalidateQueryFilters);
            toast.success("Created X",{id:"1"})
        },
        onMutate:(payload)=>toast.loading("Creating X",{id:'1'})
    })
    return mutation;
}


        export const useGetAllTweets = () => {
        const query = useQuery({
            queryKey: ["all-tweets"],
            queryFn: () => graphqlClient.request<GetAllTweetsQuery>(getAllTweetsQuery),
        });
            
        return { ...query ,tweets:query.data?.getAllTweets};
        };