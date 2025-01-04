'use client';
import React, { useEffect, useState } from 'react';
import ToppingCard from './topping-card';
import { Topping } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

const ToppingList = ({ selectedToppings, handleCheckBoxCheck }: { selectedToppings: Topping[], handleCheckBoxCheck: (topping: Topping) => void }) => {
    const [toppings, setToppings] = useState<Topping[]>([])
    const searchParams = useSearchParams()
    useEffect(() => {
        const fetchToppings = async () => {
            const toppingsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=${searchParams.get('tenantId')}`);
            const toppings = await toppingsResponse.json();
            setToppings(toppings);
        }
        fetchToppings()
    }, [])


    return (
        <section className="mt-6">
            <h3>Extra toppings</h3>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {toppings.map((topping) => {
                    return (
                        <ToppingCard
                            topping={topping}
                            key={topping.id}
                            selectedToppings={selectedToppings}
                            handleCheckBoxCheck={handleCheckBoxCheck}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default ToppingList;
