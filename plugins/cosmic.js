import Cosmic from 'cosmicjs'

const api = Cosmic()
const bucket = api.bucket({
  slug: process.env.BUCKET_SLUG,
  read_key: process.env.READ_KEY
})

export default bucket

