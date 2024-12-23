// app/(home)/page.tsx  (la carpeta "(home)" es opcional, la pongo solo como ejemplo)
import React from 'react';
import Pagination from './components/Pagination'; // Adjust the path as necessary

// Interfaz para cada personaje
interface Character {
  id: number;
  name: string;
  race: string;
  gender: string;
  image: string;
  // ... cualquier otro campo que uses
}

// Estructura de la respuesta de la API
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
    next?: string;     // puede que sea string o null/ vacío
    previous?: string; // igual, puede no existir
  };
}

async function getCharacters(page: number): Promise<CharactersResponse> {
  const res = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=16`, {
    // puedes usar 'no-cache' o 'no-store' si quieres siempre la versión fresca
    // next: { revalidate: 0 }
  });
  if (!res.ok) {
    throw new Error('Error al obtener datos de la API de Dragon Ball');
  }
  const result: CharactersResponse = await res.json();

  // result.items (array de personajes)
  // result.meta (info de paginación)
  // result.links (links a siguiente, anterior, etc.)
  return result;
}

// El componente de página recibe los "searchParams" (en App Router)
export default async function Home({
  searchParams
}: {
  searchParams?: { page?: string };
}) {
  // Obtenemos la página actual (si no viene, usamos 1)
  const currentPage = Number(searchParams?.page) || 1;

  // Llamamos a la función que trae personajes y meta
  const { items: data, meta } = await getCharacters(currentPage);

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Dragon Ball Characters</h1>

      {/* Cuadrícula de 12 personajes (o menos, si la API devuelte menos de 12) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        {data.map((char) => (
          <div
            key={char.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '1rem'
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

      {/* Zona de paginación */}
      <Pagination
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
      />
    </main>
  );
}
