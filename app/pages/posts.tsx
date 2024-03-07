import Head from 'next/head'
import { useRouter } from 'next/router'
import React, {  useState } from 'react'
import { useDebounce } from 'use-debounce'
import BlogPartner from '~/components/BlogPartner'
import Layout from '~/components/Layout'

function PostListPage() {

    const meta_title = 'Ai Tools | Ai Tool Dr'
    const meta_description = `Collecting and organizing various AI tools | Ai Tool Dr`

    return (
        <>
            <Head>
                <title>{meta_title} | AI Tool Dr</title>
                <meta name="description" content={meta_description}></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <BlogPartner currentPage={1} />
            </Layout>
        </>
    )
}

export default PostListPage
