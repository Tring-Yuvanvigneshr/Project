const userResolvers = require("./resolvers/user_Resolver");
const customerResolvers = require("./resolvers/customer_Resolver");
const workerResolvers = require("./resolvers/worker_Resolver");
const bookingResolvers = require("./resolvers/booking_Resolver");
const reviewResolvers = require("./resolvers/review_Resolver");

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...customerResolvers.Query,
    ...workerResolvers.Query,
    ...bookingResolvers.Query,
    ...reviewResolvers.Query
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...customerResolvers.Mutation,
    ...workerResolvers.Mutation,
    ...bookingResolvers.Mutation,
    ...reviewResolvers.Mutation
  }
};

module.exports = resolvers;
