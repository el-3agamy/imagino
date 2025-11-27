import PricingCard from "./pricingCard"

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-tight">
                    Get beautiful product photos in seconds
                </h1>


                <div className="flex justify-center mb-12">
                    <div className="bg-muted rounded-full p-1 flex gap-1">

                        <button className="px-6 py-2 rounded-full text-sm font-medium bg-white">
                            Monthly
                        </button>
                        <button className="px-6 py-2 rounded-full text-sm font-medium">
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
            </div>
        </main>
    );
}
