'use client';
import React, { useEffect } from 'react';
import ToppingCard from './topping-card';
import { Topping } from '@/lib/types';

const ToppingList = () => {
    const [toppings, setToppings] = React.useState<Topping[]>([])
    useEffect(() => {
        const fetchToppings = async () => {
            const toppingsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=4`);
            const toppings = await toppingsResponse.json();
            setToppings(toppings);
        }
        fetchToppings()
    }, [])

    const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([]);

    const handleCheckBoxCheck = (topping: Topping) => {
        const isAlreadyExists = selectedToppings.some((element: Topping) => element.id === topping.id);

        if (isAlreadyExists) {
            setSelectedToppings((prev) => prev.filter((elm: Topping) => elm.id !== topping.id));
            return;
        }

        setSelectedToppings((prev) => [...prev, topping]);
    };

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
