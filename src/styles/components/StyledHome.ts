import styled from 'styled-components';

export const StyledHome = styled.div`
  h1 {
    font-size: 50px;
    text-align: center;

    @media (max-width: 365px) {
      font-size: 40px;
    }
  }

  .title__input {
    width: 500px;
    max-width: 100%;
    height: 40px;
    color: #fff;
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 auto 25px;
    padding: 0 15px;
    display: block;
  }

  .body__textarea {
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

  .create__btn {
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

  .posts__list {
    list-style: none;
    margin: 0;
    padding: 0;

    .post__item {
      width: 600px;
      max-width: 100%;
      margin: 0 auto 25px;
      padding: 15px 0;
      border: 1px dashed #ccc;
      border-radius: 5px;
      position: relative;

      &-title {
        font-size: 24px;
        text-align: center;
        border-bottom: 1px dashed #ccc;
        margin: 0 0 15px;
        padding: 5px 60px 15px;
      }

      &-body {
        font-size: 18px;
        line-height: 1.3;
        text-align: justify;
        border-bottom: 1px dashed #ccc;
        margin: 5px 0 16px;
        padding: 5px 25px 15px;
      }

      .edit {
        font-size: 20px;
        fill: #ccc;
        top: 7px;
        right: 34px;
        position: absolute;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
          fill: #fff;
        }
      }

      .remove {
        font-size: 24px;
        fill: #ccc;
        top: 5px;
        right: 5px;
        position: absolute;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
          fill: #fff;
        }
      }

      .more__btn {
        color: rgb(255, 255, 255);
        background-color: rgb(135, 206, 250);
        margin: 0 auto;
        border-radius: 5px;
        width: 200px;
        max-width: 100%;
        height: 34px;
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
    }
  }
`;
