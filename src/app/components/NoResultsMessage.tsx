'use client';

import React from 'react';
import Card from './UI/Card';
import Container from './UI/Container';
import Button from './UI/Button';

interface Props {
  clear: () => void;
}

function NoResultsMessage({ clear }: Props) {
  return (
    <Container className="my-6">
      <Card className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h3>
        <p className="text-gray-600 mb-4">
          No masjids found matching your search. Try a different search term.
        </p>
        <Button onClick={clear} className="bg-gray-500 hover:bg-gray-600">
          ✕ Clear Search
        </Button>
      </Card>
    </Container>
  );
}

export default NoResultsMessage;

