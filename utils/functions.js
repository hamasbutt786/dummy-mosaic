import Head from "next/head";

export function getTitle(name) {
    return <Head
    >
        <title>{name}</title>
    </Head>

}