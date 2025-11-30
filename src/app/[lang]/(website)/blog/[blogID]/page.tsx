"use client"

import { useParams } from "next/navigation"
import { blogs } from "../page";
import Container from "@/components/shared/Container/Container";
import Section from "@/components/shared/Section/Section";

export default function SpecificBlog() {
const { blogID } = useParams();

return (
  <Container>
    <div className="flex flex-col content-center ">
        <h1 className="w-[70%]  pt-16 mx-auto text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 sm:leading-tight sm:tracking-tight">{blogs[blogID].title}</h1>
    <Section className="w-3/4 mx-auto">
       {/* <section className="w-3/4 mx-auto "> */}
         <img  src={blogs[blogID].imgPath}  width="100%" alt={blogs[blogID].title} />
       {/* </section> */}
    </Section>
    </div>
  </Container>
);
}
