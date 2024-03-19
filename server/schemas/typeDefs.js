const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
    savedMovies: [Movie]
  }

  type Book {
    _id: ID!
   authors: [String]
   description: String!
   bookId: String!
   image: String
   link: String
   title: String!
   rating: Float
  }

  type Movie {
    _id: ID!
   plot: String!
   movieId: String!
   image: String
   title: String!
   rating: Float
   directors: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
    users: [User]
  }


  type Mutation {
   login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
