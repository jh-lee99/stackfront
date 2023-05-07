import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  const loginLink = () => {
    navigate("/travel");
  };
  const images = [
    <img src="images\Travel1.png" alt="Travel1" width="100%" height="100%" />,
    <img src="images\Travel2.png" alt="Travel2" width="100%" height="100%" />,
    <img src="images\Travel3.png" alt="Travel3" width="100%" height="100%" />,
  ];

  const [img, setImg] = useState(images[0]);

  const [guide, setGuide] = useState(
    <div style={{ fontSize: "20px", fontWeight: "bold", margin: "1%" }}>
      1. 여행 떠나기 버튼 클릭
    </div>
  );

  const [index, setIndex] = useState(1);

  useEffect(() => {
    nextImage(index);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % (images.length + 1));
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  const nextImage = (num) => {
    if (num === 1) {
      console.log("1", index);
      setGuide(
        <div style={{ fontSize: "20px", fontWeight: "bold", margin: "1%" }}>
          1. 여행 떠나기 버튼 클릭
        </div>
      );
      setImg(images[0]);
    } else if (num === 2) {
      console.log("2", index);
      setGuide(
        <div style={{ fontSize: "20px", fontWeight: "bold", margin: "1%" }}>
          2. 목적지와 출발지를 입력, 달력에서 가고 싶은 기간 드래그 or 클릭,
          전송버튼 클릭
        </div>
      );
      setImg(images[1]);
    } else if (num === 3) {
      console.log("3", index);
      setGuide(
        <div style={{ fontSize: "20px", fontWeight: "bold", margin: "1%" }}>
          3. 가고 싶은 장소 클릭
        </div>
      );
      setImg(images[2]);
    }
  };

  const prev = (num) => {
    if (num > 1) {
      setIndex(num - 1);
      nextImage(index - 1);
    }
  };
  const next = (num) => {
    if (num < images.length) {
      setIndex(num + 1);
      nextImage(index + 1);
    }
  };

  return (
    <>
      <div>
        <div className="imgBtnBox"></div>
        {/*<div className="introText">*/}
        <div className="imgBox">
          <div>{guide}</div>
          <div>{img}</div>
          <nav aria-label="guide">
            <ul class="pagination">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => {
                    prev(index);
                  }}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  onClick={() => {
                    setIndex(1);
                    nextImage(index);
                  }}
                >
                  1
                </a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  onClick={() => {
                    setIndex(2);
                    nextImage(index);
                  }}
                >
                  2
                </a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  onClick={() => {
                    setIndex(3);
                    nextImage(index);
                  }}
                >
                  3
                </a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => {
                    next(index);
                  }}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="imgBtnBox">
        <Button
          href="#"
          onClick={() => {
            loginLink();
          }}
          variant="info"
          className="introBtn "
          style={{ fontSize: "15px", fontWeight: "bold", margin: "1%" }}
        >
          여행 안내 받으러 가기!
        </Button>
      </div>
    </>
  );
};

export default Intro;
