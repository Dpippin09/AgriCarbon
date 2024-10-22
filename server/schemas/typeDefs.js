const typeDefs = `
  scalar Upload

  type User {
    _id: ID
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    coins: Int
    problems: [Problem]
    comments: [Comment]
    donationTransactions: [DonationTransaction]
    avatar: String
    medals: [Medal]
    allmedals: [Medal]
  }

  type Comment {
    _id: ID
    content: String!
    author: User!
    problem: Problem!
    code: String
    language: String
    isSolution: Boolean
    createdAt: String
    updatedAt: String
    votes: [Vote]
    replies: [Comment]
  }

    type Auth {
    token: ID!
    user: User
  }

    type Vote {
    user: User!
    value: Int!
  }

  type Problem {
    _id: ID
    title: String!
    description: String!
    programmingLanguage: String!
    code: String!
    createdAt: String!
    author: User!
    comments: [Comment]
    tags: [String]
    coinReward: Int
  }

  type Solution {
    _id: ID
    problemId: ID!
    code: String!
    explanation: String
    author: User!
    createdAt: String
  }

  type Coin {
    _id: ID
    amount: Int!
    recipient: User!
    sender: User
    createdAt: String
  }

  type Donation {
    _id: ID
    name: String
    description: String
    price: Int
  }

  type DonationTransaction {
    _id: ID
    purchaseDate: String
    donations: [Donation]
  }

  type CheckoutSession {
    sessionId: String!
  }

  type Medal {
    _id: ID
    title: String!
    description: String!
    price: Int
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    usermedals(_id: ID!): [Medal]
    medals: [Medal]
    problems: [Problem]
    problem(_id: ID!): Problem
    comment(_id: ID!): Comment
    getcommentvotes(_id: ID!): Comment
    donations: [Donation]
    donation(_id: ID!): Donation
    donationtransaction(_id: ID!): DonationTransaction
  }

  type Mutation {
  # User Authentication and Management
  # These mutations handle user registration, login, and profile updates
  addUser(
    firstName: String!, 
    lastName: String!, 
    username: String!, 
    email: String!, 
    password: String!
  ): Auth

  login(
    email: String!, 
    password: String!
  ): Auth

  updateUser(
    username: String, 
    firstName: String, 
    lastName: String, 
    email: String, 
    password: String, 
    avatar: Upload
  ): User

  # Problem Management
  # These mutations allow creation, updating, and deletion of coding problems
  createProblem(
    title: String!, 
    description: String!, 
    programmingLanguage: String!, 
    code: String!, 
    tags: [String], 
    coinReward: Int
  ): Problem

  updateProblem(
    id: ID!, 
    title: String, 
    description: String, 
    programmingLanguage: String, 
    code: String, 
    tags: [String], 
    coinReward: Int
  ): Problem

  deleteProblem(
    id: ID!
  ): Boolean

  # Solution Management
  # These mutations handle the creation, updating, and deletion of solutions to problems
  addSolution(
    problemId: ID!, 
    code: String!, 
    explanation: String!
  ): Solution

  updateSolution(
    _id: ID!, 
    code: String, 
    explanation: String
  ): Solution

  deleteSolution(
    _id: ID!
  ): Solution

  # Comment Management for Solutions
  # These mutations handle adding, updating, and deleting comments on solutions
  addComment(
    problemId: ID!, 
    content: String!, 
    code: String, 
    language: String
  ): Comment

  updateComment(
    commentId: ID!, 
    content: String, 
    code: String, 
    language: String
  ): Comment

  deleteComment(
    commentId: ID!
  ): Boolean

  markCommentAsSolution(
    commentId: ID!
  ): Comment

  voteComment(
    commentId: ID!, 
    value: Int!
  ): Comment

  addReplyToComment(
    parentCommentId: ID!, 
    content: String!, 
    code: String, 
    language: String
  ): Comment

  # Coin Management
  # These mutations handle awarding, transferring, and redeeming coins
  awardCoins(
    recipientId: ID!, 
    amount: Int!, 
    reason: String!
  ): Coin

  transferCoins(
    recipientId: ID!, 
    amount: Int!
  ): Coin

  updateCoins(
    amount: Int!,
    userId: ID!
  ): User

  # Donation Transaction
  # This mutation handles making a donation
  makeDonationTransaction(
    donationId: ID!
  ): DonationTransaction

  createCheckoutSession(amount: Float!): CheckoutSession

  completeCheckoutSession(sessionId: String!): DonationTransaction

    # Medal Management on Users
    addMedalToUser(userId: ID!, medalId: ID!): User
  }
`;

export default typeDefs;