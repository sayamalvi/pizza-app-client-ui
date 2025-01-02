'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '@/lib/store/store'
import { setInitialCartItems } from '@/lib/store/features/cart/slice'

export default function StoreProvider({ children }: { readonly children: React.ReactNode }) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore()
        const isLocalStorage = typeof window !== 'undefined' && window.localStorage
        if (isLocalStorage) {
            const cart = window.localStorage.getItem('cart')
            try {
                const parsedCart = JSON.parse(cart as string)
                storeRef.current.dispatch(setInitialCartItems(parsedCart))
            } catch (error) {
                console.log(error)
            }
        }
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}