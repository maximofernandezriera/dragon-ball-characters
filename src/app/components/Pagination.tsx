// app/components/Pagination.tsx
'use client';

import { useRouter } from 'next/navigation';

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const router = useRouter();

  const handlePrevious = () => {
    // Si la página actual es mayor a 1, retrocede
    if (currentPage > 1) {
      router.push(`/?page=${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    // Si no estamos en la última página, avanza
    if (currentPage < totalPages) {
      router.push(`/?page=${currentPage + 1}`);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <button onClick={handlePrevious} disabled={currentPage <= 1}>
        Anterior
      </button>
      <span style={{ margin: '0 1rem' }}>
        Página {currentPage} de {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage >= totalPages}>
        Siguiente
      </button>
    </div>
  );
}
