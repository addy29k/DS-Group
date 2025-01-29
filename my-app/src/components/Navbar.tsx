import React from 'react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const navbar = () => {
  return (
    <div className='bg-zinc-100 py-3 border-b border-b-zinc fixed w-full top-0'>
    <div className ='container flex items-center justify-between'>
        <Link href='/'>DS Group Logo</Link>
        <Link className={buttonVariants()} href = '/sign-in'> Sign-in
        </Link>
    </div>
    </div>
  )
}

export default navbar