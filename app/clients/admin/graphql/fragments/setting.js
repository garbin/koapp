import { gql } from 'react-apollo'

export default gql`
  fragment SettingInfo on Setting {
    id
    name
    desc
    settings
  }
`
