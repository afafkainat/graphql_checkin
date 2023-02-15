export const GRAPHQL_API ="http://localhost:3000/";

export const GET_CHECKINS_QUERY =`
query checkins {
    checkins{
        created_at
        id
        image_url
        name
    }
}
`;