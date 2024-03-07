import {GetServerSideProps, GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import Layout from '~/components/Layout'
import SectionContainer from '~/components/SectionContainer'
import {Post} from '~/types/products'
import Error404 from '~/pages/404'
import {allPosts} from "contentlayer/generated";
import {Mdx} from "~/components/mdx-components";
import BlogPartner from "~/components/BlogPartner";
import React from "react";
import {IconChevronLeft , IconArrowRight} from '@supabase/ui'
import {useRouter} from "next/router";
import {pageSize} from "~/components/Pagination";

function Partner({post , page}: { post: Post , page:number}) {
    const totalPage = allPosts.length%pageSize==0?allPosts.length/pageSize:Math.floor(allPosts.length/pageSize)+1
    if (page){
        if (page > totalPage){
            return (<Error404/>)
        }

        return (
            <>
                <Head>
                    <title>Ai Tools | Ai Tool Dr</title>
                    <meta name="description" content={"Collecting and organizing various AI tools | Ai Tool Dr"}></meta>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Layout>
                    <BlogPartner currentPage={page} />
                </Layout>
            </>
        )
    }
    if (!post || !post.slug) {
        return <Error404/>
    }

    const router = useRouter();

    function goBack() {
        router.back();
    }

    return (
        <>
            <Head>
                <title>{post.title} | AI Tool Dr</title>
                <meta name="description" content={post.description + "| AI Tool Dr"}></meta>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Layout>
                <SectionContainer>
                    <div className="mx-auto flex w-full max-w-3xl justify-start px-2">
                        <button
                            className="focus-outline mb-2 mt-8 flex hover:opacity-75"
                            onClick={goBack}>
                            <IconChevronLeft className="p text-scale-900" strokeWidth={2}/>
                            <span className="p ml-4">Go back</span>
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <div className="py-6 prose">
                            <h1 className="h1 mb-2">{post.title}</h1>
                            {post.description && (
                                <p className="p">
                                    {post.description}
                                </p>
                            )}
                            <hr/>
                            <Mdx code={post.body.code}/>
                        </div>
                    </div>


                </SectionContainer>
            </Layout>
        </>
    )
}


// This also gets called at build time
export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const isNumeric = (str:any) => {
        return /^\d+$/.test(str);
    }

    const slug = params!.slug
    if (isNumeric(slug)) {
        console.log("是数字")
        return {
            props: {page: slug}
        }
    }

    const post = allPosts.find((post) => post.slugAsParams === slug)
    if (post == undefined) {
        return {props: {title: ""}}
    }
    return {
        props: {post}
    }
}


export default Partner
