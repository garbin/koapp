import gql from 'graphql-tag'

export default gql`
  fragment UserInfo on User {
    id
    username
    avatar
    email
  }
`
