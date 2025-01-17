// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'


const Home = () => {
  const router = useRouter()

  useEffect(()=>{router.replace('/sales')},[router])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
