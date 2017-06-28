import { gql } from 'react-apollo'
import { RoleInfo } from '../fragments'

export const createRole = gql`
  mutation Mutation($input: JSON!) {
    createRole(input: $input) {
      ...RoleInfo
    }
  }
  ${RoleInfo}
`

export const updateRole = gql`
  mutation Mutation($input: JSON!, $id: ID!) {
    updateRole(input: $input, id: $id) {
      ...RoleInfo
    }
  }
  ${RoleInfo}
`

export const removeRole = gql`
  mutation Mutation($id: ID!) {
    removeRole(id: $id)
  }
`
