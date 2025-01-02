'use client'
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartCounter = () => {
    return (
        
            <div className='relative'>
                <Link href="/cart">
                    <ShoppingBasket className='hover:text-primary' />
                </Link>
                <span className='absolute -top-3 -right-4 h-6 w-6 flex itemce justify-center rounded-full bg-orange-600 font-medium text-white'>
                    3
                </span>
            </div>
        
    )
}

export default CartCounter