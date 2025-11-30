"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Container from "@/components/shared/Container/Container";
import Section from "@/components/shared/Section/Section";
import faqData from "./_data/faq";


export default function FAQPage() {
  return (
    <Container>
      <Section className="py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h1>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData?.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg shadow-sm hover:shadow-md transition">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium text-gray-900">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </Container>
  );
}
