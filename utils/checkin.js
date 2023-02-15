import { gql } from '@apollo/client';


const ALL_CHECK_INS = gql`
  query MyQuery{
     checkin {
        created_at
        id
        image_url
        name
        updated_at
     }
}
`;

export default ALL_CHECK_INS;