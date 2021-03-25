import React from 'react';
import Layout from '../components/layout';
import Link from 'next/link';

export default function pokemon({ pokeman }) {
  return (
    <Layout title={pokeman.name}>
      <div className="font-mono">
        <h1 className="text-4xl mb-3 text-center capitalize">{pokeman.name}</h1>
        <img
          className="mx-auto border rounded-lg border-gray-200 bg-gray-200 mb-8"
          src={pokeman.image}
          alt={pokeman.name}
        />

        <div className="text-center bg-gray-200 py-3 border border-gray-200 rounded-lg">
          <p>
            <span className="font-bold mr-2"> Weight: </span>
            {pokeman.weight}
          </p>
          <p>
            <span className="font-bold mr-2"> Height: </span>
            {pokeman.height}
          </p>

          <h2 className="text-2xl mt-6 mb-2"> Type: </h2>
          {pokeman.types.map((type, index) => (
            <p key={index}>{type.type.name}</p>
          ))}
          <h2 className="text-2xl mt-6 mb-2"> Ability: </h2>
          {pokeman.abilities.map((ability, index) => (
            <p key={index}>{ability.ability.name} </p>
          ))}
        </div>

        <p className="mt-5 text-center text-sm">
          <Link href="/">
            <a className="underline"> Back </a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedIndex = ('00' + id).slice(-3);
    pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;

    return {
      props: { pokeman },
    };
  } catch (err) {
    console.error(err);
  }
}
