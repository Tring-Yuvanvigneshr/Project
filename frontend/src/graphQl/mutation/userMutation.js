import { gql } from "@apollo/client";

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

export const GET_ONGOING_JOBS = gql`
  query OngoingJobs($userId: ID!) {
    ongoingJobs(userId: $userId) {
      id
      job_description
      scheduled_time
      status
      customer {
        user {
          name
        }
      }
    }
  }
`;

export const GET_JOB_COUNTS = gql`
  query JobCounts($servicerId: ID!) {
    jobCounts(servicerId: $servicerId) {
      complete
      progress
      pending
    }
  }
`;


export const COMPLETE_JOB = gql`
  mutation CompleteJob($jobId: ID!, $custId: ID!) {
    completeJobRequest(jobId: $jobId, custId: $custId)
  }
`;

export const CANCEL_JOB = gql`
  mutation CancelJob($jobId: ID!, $custId: ID!) {
    cancelJobRequest(jobId: $jobId, custId: $custId)
  }
`;

export const UPDATE_CUSTOMER_INFO = gql`
  mutation UpdateCustomerInfo(
    $userId: Int!,
    $address: String!,
    $city: String!,
    $pincode: String!,
    $latitude: Float!,
    $longitude: Float!
  ) {
    updateCustomerInfo(
      userId: $userId,
      address: $address,
      city: $city,
      pincode: $pincode,
      location: {
        type: "Point",
        coordinates: [$longitude, $latitude]
      }
    ) {
      id
      address
      city
      pincode
      location
    }
  }
`;

export const UPDATE_USER_DETAILS = gql`
  mutation UpdateUserDetails($userId: ID!, $name: String, $phone: String, $address: String, $city: String) {
    updateUserDetails(userId: $userId, name: $name, phone: $phone, address: $address, city: $city) {
      id
      name
      phone
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

