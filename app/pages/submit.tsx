import Head from 'next/head'
import { useRouter } from 'next/router'
import React, {  useState } from 'react'
import { useDebounce } from 'use-debounce'
import BecomeAPartner from '~/components/BecomeAPartner'
import Layout from '~/components/Layout'
import supabase from '~/lib/supabase'

function IntegrationPartnersPage() {

    const meta_title = 'Submit Ai Tool'
    const meta_description = `Share your AI tool with the world. Submit it now for a chance to be featured on our platform and reach a broader audience.`

    return (
        <>
            <Head>
                <title>{meta_title} | AI Tool Dr</title>
                <meta name="description" content={meta_description}></meta>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <BecomeAPartner supabase={supabase} />
            </Layout>
        </>
    )
}

export default IntegrationPartnersPage
