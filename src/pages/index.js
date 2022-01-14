import Head from 'next/head'
import styles from '../styles/Home.module.css'
import TitlePage from '../components/UI/Title/TitlePage'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next Appp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <TitlePage title="home"/>
      </main>
    </div>
  )
}
