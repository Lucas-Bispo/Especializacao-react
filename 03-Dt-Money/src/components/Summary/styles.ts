import React from 'react';
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react';
import styled from 'styled-components';

const SummaryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -5rem;
`;

const SummaryCard = styled.div`
  background-color: ${({ theme }) => theme.gray600};
  border-radius: 6px;
  padding: 2rem;
`;