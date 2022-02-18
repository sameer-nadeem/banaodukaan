import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../actions/auth'
import setAuthToken from '../utils/setAuthToken';
if (typeof window !== 'undefined') {
  if (localStorage.customerToken)
    setAuthToken();
}
import Navbar from './Navbar'
import Links from './Links'


export default function Layout({ children }) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  console.log("token", token)
  useEffect(() => {
    dispatch(loadUser())
  }, [])

  useEffect(() => {
    setAuthToken()
  }, [token])

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
        <Links />
      </Head>
      <Navbar /> 
      <main className='container'>
        {
          children
        }
      </main>
      <script async src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"></script>
    </>
  )
}

