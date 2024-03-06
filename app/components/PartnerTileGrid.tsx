import Image from 'next/image'
import Link from 'next/link'
import { Product } from '~/types/products'
import {SwiperSlide} from "swiper/react";

export default function PartnerTileGrid({
  partnersByCategory,
  hideCategories = false,
}: {
  partnersByCategory: { [category: string]: Product[] }
  hideCategories?: boolean
}) {
  return (
    <>
      {Object.keys(partnersByCategory).map((category) => (
        <div key={category} id={category.toLowerCase()} className="space-y-8">
          {!hideCategories && <h2 className="h2">{category}</h2>}
          <div className="grid  gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:max-w-none">
            {partnersByCategory[category].map((p) => (
              <Link key={p.slug} href={p.have_detail?`/tool/${p.slug}`:p.website_url}>
                <a
                  className="
                " rel={p.have_detail?"":"nofollow"} target={p.have_detail?"_self":"_blank"}
                >
                  <div
                    className="

                bg-scale-100 dark:bg-scale-300
                hover:bg-scale-200 hover:dark:bg-scale-400
                group flex flex-col w-full h-full px-6 py-6 transition-all 
                border rounded 
                shadow 

               
                
                hover:shadow-lg"
                  >

                    <div className="flex w-full space-x-6">
                      <div className="w-60 h-40 transition-all ">
                        <Image
                            width={600}
                            height={400}
                            className="w-60 h-40 bg-gray-300 transition-all"
                            src={p.logo}
                            alt={p.name + "-aitooldr.com"}
                        />
                      </div>
                    </div>
                    <div className="flex w-full space-x-6">
                      <div>
                        <h3 className="transition-colors text-xl text-scale-1100 group-hover:text-scale-1200 mb-2">
                          {p.name}
                        </h3>
                        <p className="text-sm text-scale-900">{p.description}</p>
                      </div>
                    </div>

                    <div className="flex w-full space-x-6 my-1">
                      <div>
                        {p.tags.map((tag: any, i: number) => (
                            <span className="transition-colors inline-flex items-center rounded-md  px-2 py-1 mx-1 text-xs ring-1 ring-inset text-scale-1100 ">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
