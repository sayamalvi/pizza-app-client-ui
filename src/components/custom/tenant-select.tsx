'use client'
import { Tenant } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const TenantSelect = ({ restaurants }: { restaurants: Tenant[] }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const handleTenantChange = (value: string) => {
        router.push(`?tenantId=${value}`)
    }
    return (
        <Select onValueChange={handleTenantChange} defaultValue={searchParams.get('tenantId') ?? ''}>
            <SelectTrigger className="w-[180px] focus:ring-0">
                <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
                {restaurants.map((restaurant) => {
                    return (
                        <SelectItem key={restaurant.id} value={String(restaurant.id)}>
                            {restaurant.name}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    )
}

export default TenantSelect