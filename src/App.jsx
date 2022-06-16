import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from './components/Container';
import Loader from './components/Loader';

const Table = lazy(() => import('./components/Table'));
const PopupTable = lazy(() => import('./components/PopupTable'));

export default function App() {
  return (
    <>
      <Container>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Table />} />
            <Route path="popup" element={<PopupTable />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}
