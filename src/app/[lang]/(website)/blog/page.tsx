import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

import Container from '@/components/shared/Container/Container';
import Section from '@/components/shared/Section/Section';
import ProductsIdeas from '@/components/ProductsIdeas/ProductsIdeas';
import MasonryGallaryLayout from '@/components/MasonryGallaryLayout/MasonryGallaryLayout';

export default function Blog() {
    return (
        <>
            <div className="w-full min-h-screen py-12">

                {/* Header */}
                <Container>
                    <div className='px-6'>
                        <section className="text-center mb-16">
                            <h1 className="text-4xl font-bold mb-4">The Pebblely Blog</h1>
                            <p className="text-lg text-gray-600 max-w-xl mx-auto">
                                Resources to help you become smarter about using AI for your marketing.
                            </p>
                        </section>
                    </div>
                </Container>

                {/* Hero Section */}
                <section className="flex flex-wrap lg:flex-nowrap gap-8 mb-20 items-center justify-center">

                    <div className="w-full lg:w-1/2">
                        <Image
                            src="/blogImages/add-logo-cover.jpg"
                            width={900}
                            height={600}
                            alt="add_logo_cover"
                            className="rounded-xl object-cover w-full"
                        />
                    </div>

                    <div className="w-full lg:w-1/2 max-w-xl">
                        <h2 className="text-2xl font-semibold mb-3">
                            How to Add Your Logo or Badge to AI Product Photos in Bulk
                        </h2>

                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Whether you want to watermark your product photos or highlight product attributes
                            to convert more shoppers, you can now easily add your logo or badge in bulk.
                        </p>

                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12">
                                <Image
                                    src="/logo.png"
                                    fill
                                    alt="blog_creator"
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-medium">Saeid Agamy</h4>
                                <span className="text-gray-500 text-sm">Co-founder</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cards Section */}
                <section className="px-4">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-full sm:w-[48%] lg:w-[31%] max-w-md pt-0 shadow-md hover:shadow-xl hover:cursor-pointer transition-all"
                            >
                                <Card>
                                    <div className="relative w-full h-49 overflow-hidden  -mt-6">
                                        <Image
                                            src="/blogImages/add-logo-cover.jpg"
                                            alt="article_card_image"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-4 ">
                                        <CardHeader>
                                            <CardTitle>Ethereal Swirl Gradient</CardTitle>
                                            <CardDescription>
                                                Smooth, flowing gradients blending rich reds and blues in an abstract swirl.
                                            </CardDescription>
                                        </CardHeader>
                                    </CardContent>
                                </Card>

                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Product Ideas Section */}
            <div>
                <ProductsIdeas />
            </div>

            {/* Masonry Gallery Section */}
            <Section >
                <MasonryGallaryLayout />
            </Section>
        </>
    );
}
