import styled from 'styled-components';

export const StyledPostItem = styled.div`
  position: relative;

  h1 {
    font-size: 50px;
    text-align: center;

    @media (max-width: 365px) {
      font-size: 40px;
    }
  }

  .post {
    width: 600px;
    max-width: 100%;
    margin: 0 auto 25px;
    padding: 15px 0 10px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    position: relative;

    &__title {
      font-size: 24px;
      text-align: center;
      padding: 0 25px 15px;
      margin: 0 0 15px;
      border-bottom: 1px dashed #ccc;
    }

    &__body {
      font-size: 18px;
      line-height: 1.3;
      text-align: justify;
      margin: 5px 0;
      padding: 0 25px;
    }
  }

  h2 {
    font-size: 40px;
    text-align: center;
  }

  .comment__textarea {
    width: 600px;
    max-width: 100%;
    height: 200px;
    color: #fff;
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 auto 25px;
    padding: 15px;
    display: block;
    resize: none;
  }

  .comment__btn {
    font-size: 24px;
    color: rgb(255, 255, 255);
    background-color: rgb(135, 206, 250);
    margin: 0 auto 25px;
    padding: 7px 20px;
    border-radius: 5px;
    width: 300px;
    max-width: 100%;
    height: 40px;
    display: block;
    border: none;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background-color: rgb(108 186 235);
    }

    &:active {
      background-color: rgb(71 181 250);
    }
  }

  .comments__list {
    list-style: none;
    margin: 0;
    padding: 0;

    .comment__item {
      line-height: 1.3;
      width: 600px;
      max-width: 100%;
      margin: 0 auto 25px;
      padding: 15px 25px;
      border: 1px dashed #ccc;
      border-radius: 5px;
      position: relative;
    }
  }

  .back {
    font-size: 30px;
    fill: #ccc;
    top: 0;
    left: 0;
    position: absolute;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      fill: #fff;
    }
  }
`;
