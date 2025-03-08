import gql from "graphql-tag";

export const GET_ALL_WORKERS = gql`
  query {
    workers{
    id
    name
    phone
    profession
    experience
    location
    is_available
    available_from
    available_to
    created_at
  }
  }
`;