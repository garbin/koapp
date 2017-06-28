import { gql } from 'react-apollo'
import { SettingInfo } from '../fragments'

export const createSetting = gql`
  mutation Mutation($input: JSON!) {
    createSetting(input: $input) {
      ...SettingInfo
    }
  }
  ${SettingInfo}
`

export const updateSetting = gql`
  mutation Mutation($input: JSON!, $id: ID!) {
    updateSetting(input: $input, id: $id) {
      ...SettingInfo
    }
  }
  ${SettingInfo}
`

export const removeSetting = gql`
  mutation Mutation($id: ID!) {
    removeSetting(id: $id)
  }
`
