"use client"
import React from 'react'

export default function TestLayout({children} :{children : React.ReactNode}) {
    // console.log(children);
    console.log(React.Children.toArray(children));
    
console.dir(React.Children.toArray(children), { depth: null });

    
  return (
    <div>Test Layout</div>

  )
}
