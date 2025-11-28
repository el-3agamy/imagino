"use client"

import { useParams } from "next/navigation"

export default function SpecificBlog() {
    const { blogID } = useParams()

    return (
        <div className="p-10 text-3xl">
            Blog ID: {blogID}
        </div>
    )
}
