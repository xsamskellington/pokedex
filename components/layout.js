import Head from 'next/head';

export default function layout({ title, children }) {
  return (
    <div className="bg-gray-300 border-4 border-gray-300">
      <Head>
        <title> Pokedex </title>
        <link
          rel="icon"
          href="https://www.flaticon.com/svg/vstatic/svg/361/361998.svg?token=exp=1616636707~hmac=e60963482a56d10b4d62ba09f183a25d"
        />
      </Head>
      <main className="container mx-auto max-w-xl pt-8 min-h-screen font-mono">
        {children}
      </main>
    </div>
  );
}
