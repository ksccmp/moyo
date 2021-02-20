import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { openModalAction, closeModalAction } from '../../modules/progressModal';

import PersonalMain from '../../components/game/PersonalMain';
import PersonalResultModal from '../../components/game/PersonalResultModal';
import PersonalRoundModal from '../../components/game/PersonalRoundModal';

const PersonalGame = () => {
  var startRound = 16;

  const dispatch = useDispatch();

  const [round, setRound] = useState(startRound);
  const [subRound, setSubRound] = useState(0); // 계속 증가
  const [tempRound, setTempRound] = useState(0); // 라운드 변경시마다 0으로 초기화
  const [randomList, setRandomList] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
  const [openRound, setOpenRound] = useState(true);

  const resultNames = [
    '신라',
    '진라',
    '너구',
    '짜파',
    '육개',
    '참깨',
    '부대',
    '팔도',
    '라볶',
    '스파',
    '쌀국',
    '불닭',
    '틈새',
    '오모',
    '스낵',
    '삼양',
  ];

  const history = useHistory();

  useEffect(() => {
    dispatch(openModalAction());
    setRandom();
    dispatch(closeModalAction());
  }, []);

  const setRandom = () => {
    let tempList = [];

    firstloop: for (let i = 0; i < startRound; i++) {
      let val = Math.floor(Math.random() * startRound);

      for (let j = 0; j < tempList.length; j++) {
        if (tempList[j] === val) {
          i--;
          continue firstloop;
        }
      }

      tempList.push(val);
    }

    setRandomList(tempList);
  };

  const onClickImage = index => {
    setRandomList(prevState => [...prevState, index]);
    setSubRound(subRound + 1);
    setTempRound(tempRound + 1);

    if (round / 2 === tempRound + 1) {
      if (round / 2 < 4) {
        setResultMessage(
          resultNames[randomList[(subRound + 1) * 2]] +
            resultNames[index] +
            '면',
        );
      } else {
        setRound(tempRound + 1);
        setTempRound(0);
        setOpenRound(true);
      }
    }
  };

  const closeResult = () => {
    setResultMessage('');

    history.push({
      pathname: '/accompany',
    });
  };

  const closeRound = () => {
    setTimeout(() => {
      setOpenRound(false);
    }, 2000);
  };

  return (
    <div>
      <PersonalMain
        round={round}
        topindex={randomList[subRound * 2]}
        bottomindex={randomList[subRound * 2 + 1]}
        onClickImage={onClickImage}
      />

      <PersonalResultModal
        closeResult={closeResult}
        resultMessage={resultMessage}
      />

      <PersonalRoundModal
        openRound={openRound}
        closeRound={closeRound}
        round={round}
      />
    </div>
  );
};

export default PersonalGame;
