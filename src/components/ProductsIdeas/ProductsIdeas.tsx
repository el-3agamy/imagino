import React from 'react'
import Section from '../shared/Section/Section'

export default function ProductsIdeas() {
    const productsIdeasList = ["Beauty & Skincare " , "Health and Supplement" , "Candle" , "Beverage" , "Jewelry" , "Perfume"]
  return (
  <>
    <div>
        <p className='text-center font-bold text-5xl'>
                    Product Photography Ideas
        </p>
        
        </div>
        <Section  className='flex justify-between flex-wrap gap-3 px-3'>
               {
                productsIdeasList?.map((idea : string , index : number)=>(
                            <div key={index} className='py-12 px-7 bg-[#f4f3f2] hover:bg-[#E7E5E4] text-center w-100 '>
                                {idea}
                            </div>
                ))
              }
         </Section>
   
  </>
  )
}
