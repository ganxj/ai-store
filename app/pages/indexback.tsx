import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from "~/components/Layout";
import BecomeAPartner from "~/components/BecomeAPartner";
import supabase from "~/lib/supabase";
import React from "react";

const Home: NextPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Supabase Partner Gallery Example</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
        </div>
    )
}

export default Home
