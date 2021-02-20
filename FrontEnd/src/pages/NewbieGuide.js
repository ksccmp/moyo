import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';
import GuideMain from '../assets/img/GuideMain.png';
import GuideAccompanyList from '../assets/img/GuideAccompanyList.png';
import GuideAccompanyWrite from '../assets/img/GuideAccompanyWrite.png';
import GuideMessage from '../assets/img/GuideMessage.png';
import GuidePostmap from '../assets/img/GuidePostmap.png';
import moyoColor from '../api/moyoColor';

const NewbieGuide = props => {
  const prevpath = props.location.state.prevpath;
  const history = useHistory();
  const [state, setState] = useState(false);

  useEffect(() => {
    setState({ open: true });
  }, []);

  const closeGuide = () => {
    setState({ open: false });
    if (prevpath === '/more/moreSettings') {
      history.push(`${prevpath}`);
    } else {
      history.push('/accompany');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <AutoRotatingCarousel
        label={prevpath === '/more/moreSettings' ? '가이드 종료' : 'MOYO 시작'}
        open={state.open}
        onClose={closeGuide}
        onStart={closeGuide}
        mobile
        autoplay={false}
        style={{ position: 'absolute' }}
      >
        <Slide
          media={<img src={GuideMain} alt="GuideMain" />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: moyoColor.moyo_navy_1 }}
          title="모여와 함께 하는 모두의 여행"
          subtitle="모여에서 동행자를 구해보세요. 당신의 여행이 한층 더 즐거워집니다."
        />
        <Slide
          media={<img src={GuideAccompanyList} alt="GuideAccompanyList" />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: moyoColor.moyo_navy_2 }}
          title="동행 글을 확인하세요!"
          subtitle="도시와 날짜를 선택하세요. 당신의 일정에 맞는 동행자들을 확인할 수 있습니다."
        />
        <Slide
          media={<img src={GuideAccompanyWrite} alt="GuideAccompanyWrite" />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: moyoColor.moyo_navy_3 }}
          title="동행 글을 작성해보세요!"
          subtitle="원하는 동행자가 아직 없나요? 동행 글을 작성하고 원하는 조건을 선택해 보세요."
        />
        <Slide
          media={<img src={GuideMessage} alt="GuideMessage" />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: moyoColor.moyo_navy_4 }}
          title="메시지를 보내세요!"
          subtitle="마음에 드는 동행자가 있다면 메시지를 보내보세요. 직접 대화해보고 동행 일정까지 등록할 수 있습니다."
        />
        <Slide
          media={<img src={GuidePostmap} alt="GuidePostmap" />}
          mediaBackgroundStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: moyoColor.moyo_navy_5 }}
          title="포스트맵을 확인하세요!"
          subtitle="다른 여행자들이 남긴 포스트들을 확인할 수 있습니다. 당신의 위치에 따라 변하는 포스트들을 확인해보세요. (GPS를 꼭 켜주세요!)"
        />
      </AutoRotatingCarousel>
    </div>
  );
};

export default NewbieGuide;
