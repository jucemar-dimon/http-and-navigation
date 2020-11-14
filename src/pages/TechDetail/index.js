import React from 'react';

import { useRoute } from '@react-navigation/native';

import { Container, Title } from './styles';

const TechDetail = () => {
  const route = useRoute();
  const { tech } = route.params;
  return (
    <Container>
      <Title>{tech.id}</Title>
    </Container>
  );
};

export default TechDetail;
