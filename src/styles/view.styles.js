import styled from 'styled-components';

export const MainTitle = styled.h3`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  font-size: 20px;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  width: 1200px;
  color: ${({ theme }) => theme.textSecondary};
`;

export const ListWrapper = styled.ul`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0;
  width: 1200px;
`;

