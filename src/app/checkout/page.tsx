import { getSession } from '@/lib/session';
import { SEARCH_PARAMS } from '@/lib/types';
import { redirect } from 'next/navigation';
import CustomerForm from './components/customer-form';

export default async function Checkout({ searchParams }: { searchParams: SEARCH_PARAMS }) {
    const session = await getSession()
    const sParams = new URLSearchParams(searchParams)
    const currentRoute = sParams.toString()
    sParams.append('redirectTo', `/checkout?${currentRoute}`)
    if (!session) {
        redirect(`/login?${sParams.toString()}`)
    }
    return (
        <CustomerForm />
    );
}
