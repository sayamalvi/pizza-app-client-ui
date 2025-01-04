'use client'
import { useAppSelector } from '@/lib/store/hooks'
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartCounter = () => {
    const cartItems = useAppSelector((state) => state.cart.cartItems)
    return (
        <div className='relative'>
            <Link href={`/cart`}>
                <ShoppingBasket className='hover:text-primary' />
            </Link>
            <span className='absolute -top-3 -right-4 h-6 w-6 flex itemce justify-center rounded-full bg-orange-600 font-medium text-white'>
                {cartItems.length}
            </span>
        </div>

    )
}

export default CartCounter