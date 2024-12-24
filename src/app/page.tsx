import React from 'react';
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

interface PageProps {
  searchParams: Promise<{ page?: string } | undefined>; 
}

const Home: React.FC<PageProps> = async ({ searchParams }) => {
  const params = await searchParams; // Resuelve la promesa
  const pageParam = params ? params.page : undefined;
  const currentPage = Number(pageParam) || 1;

  const data = await getCharacters(currentPage);

  return (
    <main>
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
    </main>
  );
};

export default Home;