import gql from "graphql-tag";

export const REGISTER_USER = gql`
    mutation RegisterUser($email: String!, $password: String!, $role: String!) {
        registerUser(email: $email, password: $password, role: $role) {
            id
            email
            role
            created_at
        }
    }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
        role
      }
    }
  }
`;

export const CREATE_WORKER = gql`
  mutation CreateWorker(
    $userId: ID!
    $phone: String!
    $profession: String!
    $experience: Int!
    $aadhar_number: String!
    $latitude: Float!
    $longitude: Float!
    $address: String!
    $city: String!
    $name: String!
  ) {
    createWorker(
      userId: $userId
      phone: $phone
      profession: $profession
      experience: $experience
      aadhar_number: $aadhar_number
      latitude: $latitude
      longitude: $longitude
      address: $address
      city: $city
      name: $name
    ) {
      id
      user_id
      phone
      profession
      experience
      aadhar
      location
      is_available
      address
      city
      name
    }
  }
`;


export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $userId: ID!
    $phone: String!
    $address: String!
    $city: String!
    $latitude: Float
    $longitude: Float
    $name: String!
  ) {
    createCustomer(
      userId: $userId
      phone: $phone,
      address: $address
      city: $city
      latitude: $latitude
      longitude: $longitude
      name: $name
    ) {
      id
      name
      phone
      address
      city
      created_at
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomerDetails(
    $userId: ID!
    $name: String
    $phone: String
    $address: String
    $city: String
    $latitude: Float
    $longitude: Float
  ) {
    updateCustomerDetails(
      userId: $userId
      name: $name
      phone: $phone
      address: $address
      city: $city
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      name
      phone
      address
      city
      location
    }
  }
`;
