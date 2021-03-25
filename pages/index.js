import { useState } from 'react';
import Layout from '../components/layout';
import Link from 'next/link';

export default function Home({ pokemon }) {
  const [searchValue, setSearchValue] = useState('');
  const pokeName =
    pokemon.filter((element) =>
      element.name.includes(searchValue.toLocaleLowerCase())
    ) || pokemon;

  return (
    <Layout>
      <h1 className="text-4xl mb-2 text-center">First Gen Pokedex</h1>
      <div className="flex justify-center">
        <input
          className="border p-4 my-2 capitalize text-lg bg-gray-200 rounded-md outline-none w-11/12 text-center"
          type="text"
          placeholder="which pokemon are you looking for?"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <ul>
        {pokeName.map((pokeman) => (
          <li key={pokeman.name}>
            <Link href={`/pokemon?id=${pokeman.pokeIndex}`}>
              <a className="border p-4 my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md hover:bg-red-200 hover:border-red-200 transform hover:scale-105">
                <img
                  className="w-20 h-20 mr-3"
                  src={pokeman.image}
                  alt={pokeman.name}
                />
                <span className="mr-2 font-bold">{pokeman.pokeIndex}.</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const { results } = await res.json();
    const pokemon = results.map((pokeman, index) => {
      const paddedIndex = ('00' + (index + 1)).slice(-3);
      const pokeIndex = index + 1;
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;

      return {
        ...pokeman,
        image,
        pokeIndex,
      };
    });

    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
