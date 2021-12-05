// layout.js

import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'

export const siteTitle = 'IoT DVH22 Data Page'

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                name="description"
                content="Display IoT received data"
                />
                <meta name="og:title" content={siteTitle} />
            </Head>
            {!home && (
                <div className={styles.backToHome}>
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
                </div>
            )}
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
                </div>
            )}
        </div>
    )
}
