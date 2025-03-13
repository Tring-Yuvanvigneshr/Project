const { gql } = require("graphql-tag");

const worker_typedef = gql`
  type Worker {
    id: ID!
    phone: String!
    profession: String!
    experience: Int
    location: String
    is_available: Boolean
    created_at: String
    name: String
    address: String
    city: String
    available_from: String
    available_to: String
    distance: String
  }

  type WorkerForWorker {
      id: ID!
      name: String!
      phone: String!
      profession: String!
      experience: Int!
      is_available: Boolean
      available_from: String
      available_to: String
      customer_id: ID!
    }

  

  extend type Query {
    workers: [Worker]
    worker(id: ID!): Worker
    getNearbyWorkers(userId: ID!): [Worker]
    getAvailableWorkers: [Worker]
    workerForworker(id: ID!): WorkerForWorker
  }

  extend type Mutation {
    createWorker(
      userId: ID!
      phone: String!
      profession: String!
      experience: Int!
      aadhar_number: String!
      latitude: Float!
      longitude: Float!
      address: String!
      city: String!
      name: String!
      available_from: String!
      available_to: String!
    ): Worker

    updateWorkerDetails(
      userId: ID!
      phone: String
      profession: String
      experience: Int
      is_available: Boolean
    ): Worker

    updateWorkerAvailability(is_available: Boolean!, id: ID!): WorkerForWorker!
  }
`;

module.exports = worker_typedef;
