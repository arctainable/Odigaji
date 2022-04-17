import React from 'react';
import { Wheel } from 'react-custom-roulette';
import './RouletteDo.css';

function RouletteDo({
  cityShow,
  textShow,
  provinceData,
  provinceNumber,
  provinceSpin,
  stopProvinceSpin,
}) {
  return (
    <div className={'RouletteDo-' + (cityShow || textShow ? 'none' : 'show')}>
      <Wheel
        mustStartSpinning={provinceSpin}
        prizeNumber={provinceNumber}
        data={provinceData}
        outerBorderColor={['#f2f2f2']}
        outerBorderWidth={[10]}
        innerBorderColor={['#f2f2f2']}
        radiusLineColor={['#dedede']}
        radiusLineWidth={[10]}
        textColors={['white']}
        fontSize={[20]}
        backgroundColors={[
          '#CAB8FF',
          '#8A53FF',
          '#7535FE',
          '#AA14F0',
          '#BC8CF2',
        ]}
        spinDuration={[0.5]}
        onStopSpinning={() => stopProvinceSpin()}
      />
    </div>
  );
}

export default RouletteDo;
