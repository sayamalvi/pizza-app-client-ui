'use client'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { getCustomer } from '@/lib/http/api';
import { Customer } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { Coins, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, Form, FormMessage } from '@/components/ui/form';
import AddAddress from './add-address';
import OrderSummary from './order-summary';

const customerFormSchema = z.object({
    address: z.string({ required_error: 'Please select an address' }),
    paymentMode: z.enum(['card', 'cash'], {
        required_error: 'Please select a payment mode'
    }),
    comment: z.string({ required_error: 'Please enter a comment' }),
})

const CustomerForm = () => {
    const customerForm = useForm<z.infer<typeof customerFormSchema>>({
        resolver: zodResolver(customerFormSchema),
    })
    const { data: customer, isLoading } = useQuery<Customer>({
        queryKey: ["customer"],
        queryFn: getCustomer,
    });
    if (!customer || isLoading) return null


    const handlePlaceOrder = (data: z.infer<typeof customerFormSchema>) => {
        console.log(data)
    }

    return (
        <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
                <div className="flex container gap-6 mt-16">
                    <Card className="w-3/5 border-none">
                        <CardHeader>
                            <CardTitle>Customer details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="fname">First Name</Label>
                                    <Input id="fname" type="text" className="w-full" value={customer?.firstName} defaultValue={customer?.firstName} disabled />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="lname">Last Name</Label>
                                    <Input id="lname" type="text" className="w-full" value={customer?.lastName} defaultValue={customer?.lastName} disabled />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="text" className="w-full" value={customer?.email} defaultValue={customer?.email} disabled />
                                </div>
                                <div className="grid gap-3">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="name">Address</Label>
                                            <AddAddress customerId={customer._id} />
                                        </div>
                                        <FormField name='address' control={customerForm.control} render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            className="grid grid-cols-2 gap-6 mt-2">
                                                            {customer?.addresses.map((address) => {
                                                                return (
                                                                    <Card key={address.text} className="p-6">
                                                                        <div className="flex items-center space-x-2">
                                                                            <FormControl>
                                                                                <RadioGroupItem value={address.text} id={address.text} />
                                                                            </FormControl>
                                                                            <Label htmlFor={address.text} className="leading-normal">
                                                                                {address.text}
                                                                            </Label>
                                                                        </div>
                                                                    </Card>
                                                                )
                                                            })}
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }}>
                                        </FormField>
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label>Payment Mode</Label>
                                    <FormField name='paymentMode' control={customerForm.control} render={({ field }) => {
                                        return <FormItem>
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange} className="flex gap-6">
                                                    <div className="w-36">
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value={'card'}
                                                                id={'card'}
                                                                className="peer sr-only"
                                                                aria-label={'card'}
                                                            />
                                                        </FormControl>
                                                        <Label
                                                            htmlFor={'card'}
                                                            className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                            <CreditCard size={'20'} />
                                                            <span className="ml-2">Card</span>
                                                        </Label>
                                                    </div>
                                                    <div className="w-36">
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value={'cash'}
                                                                id={'cash'}
                                                                className="peer sr-only"
                                                                aria-label={'cash'}
                                                            />
                                                        </FormControl>
                                                        <Label
                                                            htmlFor={'cash'}
                                                            className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                            <Coins size={'20'} />
                                                            <span className="ml-2 text-md">Cash</span>
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    }} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="fname">Comment</Label>
                                    <FormField name='comment' control={customerForm.control} render={({ field }) => {
                                        return <FormItem>
                                            <FormControl>
                                                <Textarea className="mt-2" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <OrderSummary />
                </div>
            </form>
        </Form>
    )
}

export default CustomerForm