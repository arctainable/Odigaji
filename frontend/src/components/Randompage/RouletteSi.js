import React from 'react';
import { Wheel } from 'react-custom-roulette';

function RouletteSi({
  cities,
  citySpin,
  cityNumber,
  setCitySpin,
  randomResult,
  setRandomResult,
}) {
  return (
    <div>
      <Wheel
        mustStartSpinning={citySpin}
        prizeNumber={cityNumber}
        data={cities}
        outerBorderColor={['#f2f2f2']}
        outerBorderWidth={[10]}
        innerBorderColor={['#f2f2f2']}
        radiusLineColor={['#dedede']}
        radiusLineWidth={[10]}
        textColors={['white']}
        fontSize={[20]}
        // perpendicularText={[true]}
        backgroundColors={[
          '#CAB8FF',
          '#8A53FF',
          '#7535FE',
          '#AA14F0',
          '#BC8CF2',
        ]}
        spinDuration={[0.5]}
        onStopSpinning={() => {
          setCitySpin(false);
          const newRandomResult = [
            cities[cityNumber].option,
            cities[cityNumber].id,
          ];
          setRandomResult(randomResult.concat(newRandomResult));
        }}
      />
    </div>
  );
}

export default RouletteSi;
