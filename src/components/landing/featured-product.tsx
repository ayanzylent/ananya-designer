'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { ProductCard, type ProductCardProduct } from "@/components/shared/product-card";
import { api } from '@/lib/api';


interface FeaturedProduct extends ProductCardProduct {
    skus?: Array<{ pricePaise: number; mrpPaise: number }>;
}

export default function FeaturedProduct() {
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);

    useEffect(() => {

        async function fetchFeatured() {
            try {
                const res = await api.get<FeaturedProduct[]>("/api/v1/storefront/products/featured");
                if (res.success && res.data) {
                    setFeaturedProducts(res.data.slice(0, 8));
                }
            } catch {
                // fallback to empty
            } finally {
                setLoadingProducts(false);
            }
        }
        fetchFeatured();
    }, []);


    return (
        <section className="py-16 md:py-24 bg-[hsl(var(--card))]/50">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold">
                            Featured Products
                        </h2>
                    </div>
                    <Button variant="ghost" asChild>
                        <Link href="/categories/all">
                            See All <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {loadingProducts
                        ? Array.from({ length: 8 }).map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <CardContent className="p-0">
                                    <Skeleton className="aspect-[3/4] w-full rounded-none" />
                                    <div className="p-4 space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                        <div className="flex items-center justify-between pt-1">
                                            <Skeleton className="h-5 w-20" />
                                            <Skeleton className="h-5 w-12" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                        : featuredProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                lowestPricePaise={product.skus?.[0]?.pricePaise ?? product.basePricePaise}
                                lowestMrpPaise={product.skus?.[0]?.mrpPaise ?? product.baseMrpPaise}
                            />
                        ))}
                    {!loadingProducts && featuredProducts.length === 0 && (
                        <div className="col-span-full text-center py-12">
                            <p className="text-[hsl(var(--muted-foreground))]">
                                No featured products yet. Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}