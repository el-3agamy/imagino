"use client";

import { useParams } from "next/navigation";
import Container from "@/components/shared/Container/Container";
import Section from "@/components/shared/Section/Section";
import Image from "next/image";
import { blogs } from "../_data/blogs";

export default function SpecificBlog() {
  const { blogID } = useParams();

  const blog = blogID ? blogs[blogID] : undefined;

  if (!blog) return <div>Blog not found</div>;

  return (
    <Container>
      <div className="flex flex-col content-center">
        <h1 className="w-[70%] pt-16 mx-auto text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 sm:leading-tight sm:tracking-tight">
          {blog.title}
        </h1>
        <Section className="w-3/4 mx-auto">
          <Image
            src={blog.imgPath}
            alt={blog.title}
            width={1200}
            height={600}
            className="mx-auto"
          />
        </Section>
      </div>
    </Container>
  );
}
