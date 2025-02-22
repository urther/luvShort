import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import LeftArrow from "@/pages/step/assets/Vector 3.svg";
import RightArrow from "@/pages/step/assets/Vector 2.svg";
import Modal from "@components/step1/modal";
import ProfileForm from "@/components/step1/ProfileForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Step1PageBlock = styled.div`
  padding: 53px 30px 0 30px;
  .header-pagination {
    display: flex;
    justify-content: space-between;
    margin-bottom: 70px;
    .left-arrow {
      cursor: pointer;
    }
  }

  .title {
    margin-bottom: 67px;
    h1 {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 14px;
    }
  }

  .profile {
    .nickname-container {
      margin-bottom: 27px;
      .nickname_title {
        display: flex;
        justify-content: space-between;
        label {
          display: inline-block;
          margin-bottom: 8px;
        }
        span {
          font-size: 12p;
          &.success {
            color: #5dccc6;
          }
          &.error {
            color: red;
          }
        }
      }

      .nickname-input {
        position: relative;
        > input {
          width: 100%;
          box-sizing: border-box;
          padding: 0.6em 1em;
          color: #5dccc6;
          font-size: 18px;
          border: 1px solid #c4c4c4;
          border-radius: 8px;
          outline: none;
          &:focus {
            border: 1px solid #5dccc6;
          }
          &.error {
            border: 1px solid red;
            color: red;
          }
        }
        > span {
          position: absolute;
          right: 1em;
          top: 10px;
          background-color: #5dccc6;
          padding: 0.4em 0.8em 0.6em 0.8em;
          border-radius: 6px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          &.error {
            box-sizing: border-box;
            background: #c4c4c4;
            margin-right: 3em;
          }
        }
        > img {
          position: absolute;
          right: 1em;
          top: 10px;
        }
      }
    }
  }

  .birthday-gender {
    margin-bottom: 27px;
    .birthday-gender-title {
      label {
        display: inline-block;
        margin-bottom: 8px;
        margin-right: 1em;
      }
      span {
        font-size: 12px;
        color: red;
      }
    }

    .birthday-input-gender-checkbox {
      display: flex;
      align-items: center;
      .birthday-input-container {
        flex: 1;
        input {
          box-sizing: border-box;
          width: 90%;
          font-size: 16px;
          padding: 0.6em 1em;
          border: 1px solid #c4c4c4;
          border-radius: 8px;
          outline: none;
          &:focus {
            border: 1px solid #5dccc6;
            color: #5dccc6;
          }
        }
      }

      .gender-checkbox-container {
        display: flex;
        justify-content: right;
        .male,
        .female {
          display: flex;
          align-items: center;
          span {
            margin-left: 7px;
          }
        }
        .female {
          img {
            margin-left: 27px;
          }
        }
      }
    }
  }

  .next-step-button {
    position: absolute;
    box-sizing: border-box;
    display: block;
    bottom: 0;
    left: 0;
    border: 0;
    background: #c4c4c4;
    width: 100%;
    height: 80px;
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  .next-step-button-selected {
    background: #5dccc6;
  }
  .error {
    color: red;
  }
`;

const Step1Page = () => {
  const [isModal, setIsModal] = useState(false);
  const user = useSelector(({ user }) => user.user);
  const navigate = useNavigate();

  const onClickModal = () => {
    if (isModal === true) {
      setIsModal(false);
    } else {
      setIsModal(true);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <Step1PageBlock>
        <div className="header-pagination">
          <div className="left-arrow" onClick={onClickModal}>
            <img src={LeftArrow} alt="좌측화살표" />
          </div>
          <span>1/2</span>
          <div className="right-arrow">
            <img src={RightArrow} alt="우측화살표" />
          </div>
        </div>

        <div className="title">
          <h1>Step1</h1>
          <p>간단한 프로필을 완성해주세요</p>
        </div>
        <ProfileForm />
      </Step1PageBlock>
      {isModal && <Modal onClickModal={onClickModal} />}
    </>
  );
};

export default Step1Page;
