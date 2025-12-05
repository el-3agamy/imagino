import Container from '@/components/shared/Container/Container';
import Section from '@/components/shared/Section/Section';
import Link from 'next/link';

export default function Sec1() {
  return (
    <Section className="pt-20 pb-10">
      <Container className="text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="tag" aria-hidden>
            <span className="rounded-full px-3 py-1 bg-[color:var(--main-color)]/10 text-[color:var(--main-color)]">
              Latest
            </span>
            <span className="text-sm">Add logo or badge in bulk</span>
          </div>
        </div>

        <h1 className="hero-title text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4">
          Create AI product photos
          <br />
          that help you sell more.
          <br />
          No Photoshop skills required.
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-6">
          Remove backgrounds, generate beautiful photos, and edit with AI — all in one tool.
        </p>

        <div className="flex justify-center gap-4 flex-col sm:flex-row items-center">
          <Link href={'all-features'} className="btn btn-primary">
            Get 40 free photos every month
          </Link>
          <Link href={'blogs'} className="btn btn-secondary">
            Learn how it works
          </Link>
        </div>
      </Container>
    </Section>
  );
}
