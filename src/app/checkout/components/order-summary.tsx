import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { verifyCoupon } from '@/lib/http/api'
import { useAppSelector } from '@/lib/store/hooks'
import { getItemTotal } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import React, { useMemo, useState } from 'react'

// todo: move these to backend
const TAXES_PERCENTAGE = 18
const DELIVERY_CHARGES = 100

const OrderSummary = () => {
    const cart = useAppSelector((state) => state.cart.cartItems)

    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [couponCode, setCouponCode] = useState('')
    const [discountError, setDiscountError] = useState('')

    const subTotal = useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getItemTotal(curr)
        }, 0)
    }, [cart])


    const discountAmount = useMemo(() => {
        return Math.round((subTotal * discountPercentage) / 100)
    }, [subTotal, discountPercentage])

    const taxesAmount = useMemo(() => {
        const amountAfterDiscount = subTotal - discountAmount
        return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100)
    }, [subTotal, discountAmount])

    const grandTotalWithDiscount = useMemo(() => {
        return subTotal - discountAmount + taxesAmount + DELIVERY_CHARGES
    }, [subTotal, discountAmount, taxesAmount, DELIVERY_CHARGES])

    const grandTotalWithoutDiscount = useMemo(() => {
        return subTotal + taxesAmount + DELIVERY_CHARGES
    }, [subTotal, taxesAmount, DELIVERY_CHARGES])

    const { mutate: verifyCouponMutation } = useMutation({
        mutationKey: ['verifyCoupon'],
        mutationFn: () => {
            return verifyCoupon(couponCode)
        },
        onSuccess: (data) => {
            if (data.valid) {
                setDiscountError('')
                setDiscountPercentage(data.discount)
                return;
            }
            setDiscountError('Coupon is invalid')
            setDiscountPercentage(0)
        },
        onError: () => {
            setDiscountError('Coupon is invalid')
        }
    })
    const handleCouponValidation = (e: React.MouseEvent) => {
        e.preventDefault()
        verifyCouponMutation()
    }

    return (
        <Card className="w-2/5 border-none h-auto self-start">
            <CardHeader>
                <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
                <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{subTotal}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Taxes</span>
                    <span className="font-bold">₹{taxesAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Delivery charges</span>
                    <span className="font-bold">₹{DELIVERY_CHARGES}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Discount</span>
                    <span className="font-bold">₹{discountAmount}</span>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                    <span className="font-bold">Order total</span>
                    <span className="font-bold flex flex-col items-end">
                        <span className={discountPercentage ? 'line-through text-gray-400' : ''}>₹{grandTotalWithoutDiscount}</span>
                        {discountPercentage ? <span>₹{grandTotalWithDiscount}</span> : null}
                    </span>
                </div>
                {discountError && <div className='text-red-500'>{discountError}</div>}
                <div className="flex items-center gap-4">
                    <Input
                        id="coupon"
                        name='coupon'
                        type="text"
                        className="w-full"
                        placeholder="Coupon code"
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button onClick={handleCouponValidation} variant={'outline'}>Apply</Button>
                </div>

                <div className="text-right mt-6">
                    <Button>Place order</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderSummary