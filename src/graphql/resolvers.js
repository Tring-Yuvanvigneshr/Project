const userResolvers = require("./type_and_resolvers/user/user_Resolver");
const customerResolvers = require("./type_and_resolvers/customer/customer_Resolver");
const workerResolvers = require("./type_and_resolvers/worker/worker_Resolver");
const bookingResolvers = require("./type_and_resolvers/booking/booking_Resolver");
const reviewResolvers = require("./type_and_resolvers/review/review_Resolver");

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
