import { IconLoader, IconSearch, Input } from '@supabase/ui'
import { error } from 'console'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import BecomeAPartner from '~/components/BecomeAPartner'
import Layout from '~/components/Layout'
import PartnerLinkBox from '~/components/PartnerLinkBox'
import PartnerTileGrid from '~/components/PartnerTileGrid'
import SectionContainer from '~/components/SectionContainer'
import supabase from '~/lib/supabase'
import { Product } from '~/types/products'
import Footer from "~/components/Footer";

export async function getStaticProps() {
  const { data: partners, error } = await supabase
    .from<Product>('partners')
    .select('*')
    .eq('approved', true)
    .eq('type', 'tools')
    .order('category')
    .order('name').limit(99)
  if (error) console.log(partners, error)

  // const {count, error:err} = await supabase
  //     .from<Product>('partners')
  //     .select('*', {count: 'exact'})
  //     .eq('approved', true)
  //     .eq('type', 'tools')
  // if (err) console.log(count, err)

  return {
    props: {
      partners: partners ?? [],
      // count: count ?? 0,
    },
    // TODO: consider using Next.js' On-demand Revalidation with Supabase function hooks instead
    revalidate: 18000, // In seconds - refresh every 5 hours
  }
}

interface Props {
  partners: Product[]
}

function IntegrationPartnersPage(props: Props) {
  const { partners: initialPartners } = props
  const [partners, setPartners] = useState(initialPartners)

  const allCategories = Array.from(
    new Set(initialPartners.map((p) => p.category))
  )

  const partnersByCategory: { [category: string]: Product[] } = {}
  partners.forEach(
    (p) =>
      (partnersByCategory[p.category] = [
        ...(partnersByCategory[p.category] ?? []),
        p,
      ])
  )
  const router = useRouter()

  const meta_title = 'Find AI Tools Easily'
  const meta_description = `Effortlessly discover the tools you need with our AI Tool Dr platform. Streamlining your search for AI resources, we make finding tools a breeze`

  const [search, setSearch] = useState('')
  const [current, setCurrent] = useState(1)
  const [debouncedSearchTerm] = useDebounce(search, 300)
  const [debouncedPageTerm] = useDebounce(current, 10)
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    console.log("useEffect")

    const searchPartners = async () => {
      setIsSearching(true)

      let query = supabase
        .from<Product>('partners')
          .select('*')
          .eq('approved', true)
          .eq('type', 'tools')
          .order('category')
          .order('name')

      if (search.trim()) {
        query = query
          // @ts-ignore
          .textSearch('tsv', `${search.trim()}`, {
            type: 'websearch',
            config: 'english',
          })
      }

      const { data: partners } = await query

      return partners
    }

    const morePartners = async () => {
      setIsLoading(true)
      let query = supabase
          .from<Product>('partners')
          .select('*')
          .eq('approved', true)
          .eq('type', 'tools')
          .order('category')
          .order('name')
          .range((current-1)*100 , current*100)

      const { data: list } = await query

      console.log(partners)
      console.log(list)
      list?.forEach(e=>{
        partners.push(e)
      })
      console.log(partners)

      return partners
    }

    if (search.trim() === '' && current === 1) {
      setIsSearching(false)
      setPartners(initialPartners)
      setCurrent(1)
      return
    }

    if (search.trim() !== '') {
      searchPartners().then((partners) => {
        if (partners) {
          setPartners(partners)
        }
        setIsSearching(false)
      })
    }


    if (search.trim() === '' && current !== 1) {
      console.log("morePartners")
      morePartners().then((list) => {
        if (list) {
          setPartners(list)
        }
        setIsLoading(false)
      })
    }

  }, [debouncedPageTerm, debouncedSearchTerm, router])

  return (
    <>
      <Head>
        <title>{meta_title} | AI Tool Dr</title>
        <meta name="description" content={meta_description}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <SectionContainer className="space-y-16">
          <div>
            <h1 className="h1">AI Tool Dr</h1>
            <h2 className="text-xl text-scale-900">{meta_title}</h2>
          </div>
          {/* Title */}
          <div className="grid space-y-12 md:gap-8 lg:grid-cols-12 lg:gap-16 lg:space-y-0 xl:gap-16">
            <div className="lg:col-span-4 xl:col-span-3">
              {/* Horizontal link menu */}
              <div className="space-y-6">
                {/* Search Bar */}

                <Input
                  size="small"
                  icon={<IconSearch />}
                  placeholder="Search..."
                  type="text"
                  // className="md:w-1/2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  actions={
                    isSearching && (
                      <span className="mr-1 animate-spin text-white">
                        <IconLoader />
                      </span>
                    )
                  }
                />
                <div className="hidden lg:block">
                  <div className="mb-2 text-sm text-scale-900">Categories</div>
                  <div className="space-y-1">
                    {allCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() =>
                          router.push(`#${category.toLowerCase()}`)
                        }
                        className="block text-base text-scale-1100"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="mb-2 text-sm text-scale-900">
                    Explore more
                  </div>
                  <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">

                    <PartnerLinkBox
                      href={`/submit`}
                      title="Submit Ai Tool"
                      color="brand"
                      description="Submit your AI tool for a chance to showcase it on our platform and reach a wider audience."
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      }
                    />
                    <PartnerLinkBox
                      href={`/posts`}
                      title="Ai Tools"
                      color="brand"
                      description=""
                      icon={
                        <svg  className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1504" width="200" height="200"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m-147.911111 813.511111l-71.111111-17.066667 2.844444-14.222222c25.6-99.555556 76.8-187.733333 147.911111-258.844444-22.755556-36.977778-19.911111-85.333333 8.533334-119.466667 34.133333-36.977778 88.177778-45.511111 130.844444-17.066667 42.666667 28.444444 56.888889 82.488889 34.133333 128-19.911111 42.666667-68.266667 62.577778-113.777777 54.044445-68.266667 62.577778-116.622222 142.222222-139.377778 233.244444v11.377778zM768 605.866667c-48.355556 85.333333-139.377778 136.533333-236.088889 136.533333-14.222222 0-28.444444 0-45.511111-2.844444l-14.222222-2.844445 11.377778-71.111111 14.222222 2.844444c85.333333 14.222222 170.666667-28.444444 210.488889-105.244444 39.822222-76.8 25.6-170.666667-36.977778-230.4-65.422222-65.422222-170.666667-76.8-250.311111-25.6-79.644444 51.2-110.933333 153.6-73.955556 241.777778l5.688889 14.222222-68.266667 28.444444-5.688888-14.222222c-14.222222-31.288889-19.911111-68.266667-19.911112-102.4 0-113.777778 71.111111-216.177778 179.2-256 108.088889-39.822222 227.555556-8.533333 301.511112 79.644445 73.955556 82.488889 85.333333 207.644444 28.444444 307.2z" fill="#0b9915" p-id="1505"></path></svg>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 xl:col-span-9">
              {/* Partner Tiles */}
              <div className="grid space-y-10">
                {partners.length ? (
                  <PartnerTileGrid partnersByCategory={partnersByCategory} />
                ) : (
                  <h2 className="h2">No Partners Found</h2>
                )}
              </div>
            </div>
          </div>
          {/* Become a partner form */}
        </SectionContainer>
        {/*<BecomeAPartner supabase={supabase} />*/}


        <div className="flex w-full justify-center">
          {isLoading?(
            <div>
              <span className="mr-1 animate-spin text-white">
                <IconLoader/>
              </span>
            </div>
          ):(<div></div>)
          }
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-1">
          <button
              onClick={() =>
                  // console.log(current+1)
                  setCurrent(current+1)
              }
              className="block text-base text-scale-1100"
          >
            view More
          </button>
        </div>


      </Layout>
    </>
  )
}

export default IntegrationPartnersPage
