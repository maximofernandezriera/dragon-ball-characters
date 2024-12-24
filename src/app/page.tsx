"use client"; 

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Pagination from './components/Pagination'; // Ajusta la ruta según sea necesario

interface Character {
  id: number;
  name: string;
  race: string;
  gender: string;
  image: string;
}

interface CharactersResponse {
  items: Character[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    next?: string;
    previous?: string;
  };
}

async function getCharacters(page: number): Promise<CharactersResponse> {
  const res = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=16`);
  if (!res.ok) {
    throw new Error('Error al obtener datos de la API de Dragon Ball');
  }
  return res.json();
}

const CharactersList: React.FC = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const currentPage = Number(pageParam) || 1;

  const [data, setData] = React.useState<CharactersResponse | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacters(currentPage);
      setData(data);
    };
    fetchData();
  }, [currentPage]);

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <h1>Dragon Ball Characters</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {data.items.map((char) => (
          <div
            key={char.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '1rem',
            }}
          >
            <img
              src={char.image}
              alt={char.name}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
            <h2>{char.name}</h2>
            <p>Género: {char.gender}</p>
            <p>Raza: {char.race}</p>
          </div>
        ))}
      </div>
      <Pagination currentPage={data.meta.currentPage} totalPages={data.meta.totalPages} />
    </>
  );
};

const Home: React.FC = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CharactersList />
    </Suspense>
  );
};

export default Home;