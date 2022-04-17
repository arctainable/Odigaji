import React from 'react';
import './LocalModal.css';
import ModalRating from '../../components/Travelpage/ModalRating';

const LocalModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, cityId, rating, setRating, province, name } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            <div>다녀온 곳 등록</div>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <div className="starRatingAsignment">
            <div className="starRatingAsignmentTitle">
              {(province === '자치 시도' ? '' : province) +
                '\n' +
                name +
                '는 어떠셨나요?'}
            </div>
            {
              <ModalRating
                cityId={cityId}
                rating={rating}
                setRating={setRating}
              />
            }
          </div>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default LocalModal;
