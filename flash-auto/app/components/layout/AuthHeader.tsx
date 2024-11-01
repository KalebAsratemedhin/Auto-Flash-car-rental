'use client'

import Link from "next/link";


const AuthHeader = () => {
  
//   if(loading)
//     return <Loading />

//   if(error)
//     return <Error message={error} />


//   if(data){
//     const user = data.data

  return (
    <div >        
        {
          user &&
          <div className='logged-in'>
            <button onClick={() => localStorage.removeItem('accessToken')} className='signout'>signout</button>
            <Link href='/dashboard'>{user.slice(0, 2).toUpperCase()}</Link>
          </div>
          

        }
    </div>
  )}


export default AuthHeader