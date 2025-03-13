const { gql } = require("graphql-tag");
const user_typedef = require("./type_and_resolvers/user/user_typedef");
const customer_typedef = require("./type_and_resolvers/customer/customer_typedef");
const worker_typedef = require("./type_and_resolvers/worker/worker_typedef");
const review_typedef = require("./type_and_resolvers/review/review_typedef");
const booking_typedef = require("./type_and_resolvers/booking/booking_typedef");

const baseType = gql`
  type Query
  type Mutation
`;

module.exports = [
  baseType,
  user_typedef,
  customer_typedef,
  worker_typedef,
  review_typedef,
  booking_typedef,
];
