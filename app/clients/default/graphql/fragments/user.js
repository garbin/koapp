import { gql } from 'react-apollo'

export default gql`
  fragment UserInfo on User {
    id
    username
    avatar
    email
  }
`
