import React from 'react';

import * as S from './styles';

interface PhotoProps {
  uri: string | null;
}

export const Photo: React.FC<PhotoProps> = ({ uri }) => {
  if (uri) {
    return <S.Image source={{ uri }} />;
  }

  return (
    <S.Placeholder>
      <S.PlaceholderTitle>Nenhuma foto{'\n'}carregada</S.PlaceholderTitle>
    </S.Placeholder>
  );
};
