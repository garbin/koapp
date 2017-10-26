import gql from 'graphql-tag'

export default gql`
  fragment SettingInfo on Setting {
    id
    name
    desc
    settings
  }
`
