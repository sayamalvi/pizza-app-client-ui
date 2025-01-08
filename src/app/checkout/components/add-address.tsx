import { z } from 'zod'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, Form, FormMessage } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAddress } from '@/lib/http/api';
import SubmitButton from '@/components/custom/submit-button';

const addAddressSchema = z.object({
    address: z.string().min(2, {
        message: 'Address is too short'
    })
})

const AddAddress = ({ customerId }: { customerId: string }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const queryClient = useQueryClient()
    const addAddressForm = useForm<z.infer<typeof addAddressSchema>>({
        resolver: zodResolver(addAddressSchema)
    })
    const { mutate: addAddressMutation, isPending: addingAddress } = useMutation({
        mutationKey: ['addAddress', customerId],
        mutationFn: (address: string) => {
            return addAddress(customerId, address)
        },
        onSuccess: () => {
            addAddressForm.reset()
            queryClient.invalidateQueries({ queryKey: ['customer'] })
            setDialogOpen(false)
        }
    })
    const handleAddAddress = (data: z.infer<typeof addAddressSchema>) => {
        addAddressMutation(data.address)
    }
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button size={'sm'} variant={'link'}>
                    <Plus size={'16'} />
                    <span className="ml-2">Add New Address</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form  {...addAddressForm}>
                    <form onSubmit={addAddressForm.handleSubmit(handleAddAddress)}>
                        <DialogHeader>
                            <DialogTitle>Add Address</DialogTitle>
                            <DialogDescription>
                                We can save your address for next time order.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <FormField name='address' control={addAddressForm.control} render={({ field }) => {
                                    return <FormItem>
                                        <FormControl>
                                            <Textarea className="mt-2" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }} />
                            </div>
                        </div>
                        <DialogFooter>
                            <SubmitButton defaultText='Add address' loadingText='Adding address' pending={addingAddress} />
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddAddress