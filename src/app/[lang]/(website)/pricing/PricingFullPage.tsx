"use client";
import { useState } from "react";
import PricingCard from "./pricingCard";

const faqItems = [
    {
        q: "Can I get a free trial?",
        a: "We do not offer free trials at the moment. We have included more than 40 themes, even including themes such as necklace and interiors, so that you can try various backgrounds before choosing to subscribe."
    },
    {
        q: "Are there any discounts?",
        a: "If you get the annual plan, you get 2+ months free (or about 20% discount)."
    },
    {
        q: "Can I use the photos for my business?",
        a: "Yes, you own the photos you generate. See our terms for more."
    },
    {
        q: "Do you use my uploads and results for training?",
        a: "No, uploaded images and generated images are not used for any AI training. Contrary to popular belief, training with artificial images will make the AI generate less photorealistic images."
    },
    {
        q: "What does the 90-day and unlimited storage mean?",
        a: "We store your generated images for 90 days if you are inactive. Paid plans include unlimited storage."
    },
];

export default function PricingFullPage() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-background text-foreground">

            <div className="container mx-auto px-4 py-16">

                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-tight">
                    Get beautiful product photos in seconds
                </h2>

                <div className="flex justify-center mb-12">
                    <div className="rounded-full p-1 flex gap-1 bg-muted">
                        <button className="px-6 py-2 rounded-full text-sm font-medium bg-card text-card-foreground">
                            Monthly
                        </button>
                        <button className="px-6 py-2 rounded-full text-sm font-medium bg-card text-card-foreground">
                            Yearly: 2+ months free
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="h-full">
                        <PricingCard
                            title="Free"
                            price="US$0"
                            features={[
                                "40 images every month",
                                "1024×1024 images",
                                "40+ background themes",
                                "90-day storage for inactive users",
                            ]}
                        />
                    </div>
                    <div className="h-full">
                        <PricingCard
                            title="Basic"
                            price="US$15"
                            description="Billed $179 annually"
                            features={[
                                "Every feature in Free",
                                "1,000 images every month",
                                "Custom sizes up to 2048×2048",
                                "Create custom backgrounds",
                                "Use reference images",
                                "Generate with multiple products",
                                "Edit generated images",
                                "Reuse backgrounds",
                                "Bulk generate images",
                                "Add logo or badge",
                                "Unlimited storage",
                            ]}
                        />
                    </div>
                    <div className="h-full">
                        <PricingCard
                            title="Pro"
                            price="US$32"
                            description="Billed $379 annually"
                            highlight
                            features={[
                                "Every feature in Basic",
                                "Unlimited images",
                                "Priority support",
                            ]}
                        />
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mt-24">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Frequently asked questions
                    </h2>

                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <div
                                key={index}
                                className="border-b pb-4 rounded-xl transition hover:bg-muted hover:shadow-md hover:border-transparent px-3"
                            >
                                <button
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                    className="w-full flex justify-between items-center text-left text-lg font-medium py-2"
                                >
                                    <span>{item.q}</span>
                                    <span
                                        className={`transition-transform duration-200 ${openFAQ === index ? "rotate-180" : ""
                                            }`}
                                    >
                                        ▾
                                    </span>
                                </button>
                                {openFAQ === index && (
                                    <p className="mt-2 text-sm text-(var(--muted-foreground))">
                                        {item.a}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="relative w-full h-[500px] flex items-center justify-center"
                style={{
                    backgroundImage: "url('/BackgroundIMG.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]"></div> 
                <div className="relative text-center text-foreground px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Grow your business with AI
                    </h1>
                    <button className="bg-main hover:bg-main-hover text-foreground font-semibold px-6 py-3 rounded-lg transition">
                        Try Pebblely free
                    </button>
                </div>
            </div>

        </main>
    );
}
