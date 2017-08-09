import { gql } from 'react-apollo'

export default gql`
  fragment RoleInfo on Role {
    id
    name
    desc
    permissions
  }
`
