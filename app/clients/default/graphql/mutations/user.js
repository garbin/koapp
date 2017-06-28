import { gql } from 'react-apollo'
import { UserInfo } from '../fragments'

export const createUser = gql`
  mutation Mutation($input: JSON!) {
    createUser(input: $input) {
      ...UserInfo
    }
  }
  ${UserInfo}
`

export const updateUser = gql`
  mutation Mutation($input: JSON!, $id: ID!) {
    updateUser(input: $input, id: $id) {
      ...UserInfo
    }
  }
  ${UserInfo}
`

export const removeUser = gql`
  mutation Mutation($id: ID!) {
    removeUser(id: $id)
  }
`
