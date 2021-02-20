import React from 'react';
import Carousel from 'nuka-carousel';
import { Typography, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const AdvertisingImage = styled.img`
  border-radius: 1rem;
`;

const AdvertisingContents = ({ promotions }) => {
  const history = useHistory();
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h6" style={{ padding: '0.5rem' }}>
          프로모션
        </Typography>
      </Grid>
      <Grid item>
        <Carousel
          autoplay
          autoplayInterval={3000}
          wrapAround
          defaultControlsConfig={{
            pagingDotsStyle: {
              fill: 'white',
            },
          }}
          renderCenterLeftControls={() => null}
          renderCenterRightControls={() => null}
        >
          {promotions &&
            promotions.map((promotion, index) => (
              <AdvertisingImage
                key={index}
                alt={`ad_image_${index}`}
                src={promotion}
              />
            ))}
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default AdvertisingContents;
