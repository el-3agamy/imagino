import Section from '@/components/shared/Section/Section';
import Container from '@/components/shared/Container/Container';

const faqs = [
  {
    category: 'About Pebblely',
    items: [
      {
        q: 'What is Pebblely?',
        a: 'Pebblely helps you quickly generate high‑quality product photos from simple uploads, so you can create marketing‑ready images without a full photo shoot.',
      },
      {
        q: 'How can I use Pebblely?',
        a: 'Use Pebblely to remove backgrounds, create lifestyle scenes, and generate consistent product imagery for ads, social posts, and online stores.',
      },
    ],
  },
  {
    category: 'Getting started',
    items: [
      {
        q: 'How do I sign in or create an account?',
        a: 'Sign up with your email address, then upload your first product image to start generating scenes.',
      },
      {
        q: 'How do I upload my first product image?',
        a: 'From the Home page, click Upload new products, then drag and drop or select an image file from your device.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className="w-full bg-background text-foreground">
      <Section className="py-10 sm:py-16">
        <Container className="max-w-3xl space-y-10">
          <header className="space-y-2">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Frequently Asked Questions &amp; Tips
            </h1>
            <p className="text-sm text-muted-foreground">
              Learn how to get started, generate better images, and make the most of Imagino.
            </p>
          </header>

          <div className="space-y-10 text-sm leading-relaxed sm:text-base">
            {faqs.map((section) => (
              <section key={section.category} className="space-y-4">
                <h2 className="text-lg font-semibold sm:text-xl">{section.category}</h2>

                <div className="space-y-6">
                  {section.items.map((item) => (
                    <div key={item.q} className="space-y-1">
                      <h3 className="font-medium">{item.q}</h3>
                      <p className="text-muted-foreground">{item.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
