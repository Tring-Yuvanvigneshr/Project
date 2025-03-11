const { gql } = require("graphql-tag");

const typeDefs = gql`
    type User {
      id: ID!
      email: String!
      role: String!
      created_at: String
    }

    type AuthPayload {
      token: String!
      user: User!
    }

    type Customer {
      id: ID!
      phone: String!
      name: String
      address: String
      city: String
      location: String
      created_at: String
      user_id: ID
    }

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

    type Review {
      id: ID!
      customer_id: ID!
      worker_id: ID!
      rating: Int!
      comment: String
      created_at: String
    }

    type WorkerWithRating {
      id: ID!
      user: User!
      phone: String
      profession: String!
      experience: Int
      location: String
      is_available: Boolean
      created_at: String
      average_rating: Float
    }

    type Review {
      id: ID!
      rating: Int!
      comment: String
      created_at: String 
    }

    type Booking {
        id: ID!
        customer_id: ID!
        worker_id: ID!
        status: String!
        job_description: String!
        scheduled_time: String!
        completed_time: String
        payment_status: String!
        created_at: String!
    }


    type BookingForTable {
      id: ID!
      customer_id: ID!
      worker_id: ID!
      job_description: String!
      scheduled_time: String!
      status: String!
      worker: Worker!
    }





    # for Worker



    type BookingForWorker {
      id: ID!
      customer_id: ID!
      worker_id: ID!
      status: String!
      job_description: String!
      scheduled_time: String!
      completed_time: String
      payment_status: String!
      created_at: String!
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



    type Query {
      users: [User]
      customers: [Customer]
      getCustomerDetails(userId: ID!): Customer
      workers: [Worker]
      reviews: [Review]
      worker(id: ID!): Worker
      reviewsByWorker(worker_id: ID!): [Review]
      getBookingByCustomerAndWorker(customer_id: ID!, worker_id: ID!): Booking
      getBookingsByCustomer(customer_id: ID!): [BookingForTable]
      getNearbyWorkers(userId: ID!): [Worker]
      

      # for worker

      getBookingsByWorker(worker_id: ID!): [BookingForWorker]
      workerForworker(id: ID!): WorkerForWorker
    }

    type Mutation {
      registerUser(email: String!, password: String!, role: String!): User
      signIn(email: String!, password: String!): AuthPayload
      updateUserDetails(userId: ID!, name: String, address: String, city: String): User
      updateCustomerDetails(userId: ID!, name: String, phone: String, address: String, city: String, latitude: Float, longitude: Float): Customer
      updateWorkerDetails(userId: ID!, phone: String, profession: String, experience: Int, is_available: Boolean): Worker
      createWorker(
        userId: ID!,
        phone: String!,
        profession: String!,
        experience: Int!,
        aadhar_number: String!,
        latitude: Float!
        longitude: Float!,
        address: String!
        city: String!,
        name: String!
        available_from: String!
        available_to: String!
      ): Worker

      createCustomer(
        userId: ID!
        name: String!
        phone: String!
        address: String!
        city: String!
        latitude: Float
        longitude: Float
      ): Customer

      createBooking(
        customer_id: ID!
        worker_id: ID!
        job_description: String!
        scheduled_time: String!
      ): Booking

      addReview(
        customer_id: ID!
        worker_id: ID!
        rating: Int!
        comment: String!
      ): Review



      # for worker
      updateWorkerAvailability(is_available: Boolean!, id: ID!): WorkerForWorker!
      updateBookingStatus(id: ID!, status: String!): Booking
    }
`;

module.exports = typeDefs;
