import gql from 'graphql-tag'

export default gql`
  fragment RoleInfo on Role {
    id
    name
    desc
    permissions
  }
`
