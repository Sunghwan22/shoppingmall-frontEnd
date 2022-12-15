import { useState } from 'react';
import styled from 'styled-components';
import InquiryDetail from './InquiryDetail';

const Container = styled.div`
  padding-inline: 15%;
  padding-bottom: 5em;
  padding-top: 5em;
`;

const H2 = styled.h2`
  font-size: 2em;
  font-weight: bold;
  padding-bottom: .5em;
`;

const PageList = styled.ul`
    display: flex;
    justify-content: center;

    button {
      border: none;
      background-color: transparent;
      margin-top: 2em;
      margin-left: 1em;
      font-size: 1em;
      cursor: pointer;
    }
`;

const WriteInquiryButton = styled.button`
  margin-left: 1em;
  font-size: 1.1em;
  padding: .7em 1.5em .7em 1.5em;
  background-color: #35992D;
  color: #FFFFFF;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const FindMyInquiryButton = styled.button`
  margin-left: 1em;
  font-size: 1.1em;
  padding: .7em 1.5em .7em 1.5em;
  color: #35992D;
  background-color: transparent;
  border: 1px solid #35992D;
  border-radius: 3px;
  cursor: pointer;
`;

const Table = styled.table`
  margin-top: 1em;
  border-top: 2px solid black;
  border-bottom: 1px solid #D9D9D9;
  width: 100%;

  th {
    border-bottom: 1px solid #D9D9D9;
    padding-top: 1em;
    padding-bottom: 1em;
    font-size: 1.1em;
    font-weight: bold;
  }
`;

const Tbody = styled.tbody`
  width: 100%;
`;

const AnswerStatus = styled.th`
    width: 10%;
`;

const Content = styled.th`
    width: 65%;
`;

const Writer = styled.th`
  width: 12.5%;
`;

const Date = styled.th`
  width: 12.5%;
`;

const Tr = styled.tr`
  width: 100%;

  td {
    padding-left: 2em;
    padding-top: 1.5em;
    font-size: 1em;
  }

  td:last-child {
    padding-bottom: 1.5em;
  }

  button {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-left: 2em;
    word-break: break-all;
    font-size: 1em;
    height: 1em;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const NoInquiryContainer = styled.div`
  padding-inline: 15%;
  padding-bottom: 5em;
  padding-top: 5em;
`;

const GuideMessage = styled.p`
  padding-top: 5em;
  text-align: center;
  font-size: 1.5em;
`;

export default function ProductInquiries(
  {
    inquiries,
    totalInquiryNumber,
    inquiryPageNumbers,
    onClickInquiryPageNumbers,
    onClickInquiry,
    inquiry,
    onClickWriteInquiry,
    onClickFindMyInquiries,
  },
) {
  const [inquiryDetail, setInquiryDetail] = useState(false);

  const handleClickPageNumber = (number) => {
    onClickInquiryPageNumbers(number);
    setInquiryDetail(false);
  };

  const handleClickInquiry = (inquiryId) => {
    onClickInquiry(inquiryId);
    setInquiryDetail(!inquiryDetail);
  };

  const handleClickCreateInquiry = () => {
    onClickWriteInquiry();
  };

  const handleClickMyInquiries = () => {
    onClickFindMyInquiries();
  };

  if (inquiries.length === 0) {
    return (
      <NoInquiryContainer>
        <H2>
          Q&A
          {' '}
          {totalInquiryNumber}
        </H2>
        <WriteInquiryButton
          type="button"
          onClick={handleClickCreateInquiry}
        >
          상품 Q&A작성하기
          {' '}
        </WriteInquiryButton>
        <FindMyInquiryButton
          type="button"
          onClick={handleClickMyInquiries}
        >
          나의 Q&A 조회
          {' '}
        </FindMyInquiryButton>
        <GuideMessage>작성된 상품 문의가 없습니다</GuideMessage>
      </NoInquiryContainer>
    );
  }

  return (
    <Container>
      <H2>
        Q&A
        {' '}
        {totalInquiryNumber}
      </H2>
      <WriteInquiryButton
        type="button"
        onClick={handleClickCreateInquiry}
      >
        상품 Q&A작성하기
        {' '}
      </WriteInquiryButton>
      <FindMyInquiryButton
        type="button"
        onClick={handleClickMyInquiries}
      >
        나의 Q&A 조회
        {' '}
      </FindMyInquiryButton>
      <Table>
        <thead>
          <tr>
            <AnswerStatus>답변상태</AnswerStatus>
            <Content>제목</Content>
            <Writer>작성자</Writer>
            <Date>작성일</Date>
          </tr>
        </thead>
        <Tbody>
          {inquiries.map((productInquiry) => (
            <Tr
              key={productInquiry.id}
            >
              <td>
                {productInquiry.answerStatus}
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleClickInquiry(productInquiry.id)}
                >
                  {productInquiry.content}
                </button>
              </td>
              <td>{productInquiry.userNickName}</td>
              <td>{productInquiry.createdAt}</td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PageList>
        {inquiryPageNumbers.map((number) => (
          <li key={number}>
            <button
              type="button"
              onClick={() => handleClickPageNumber(number)}
              id={`inquiry-pageNumber${number}`}
              data-testid={`inquiry-pageNumber${number}`}
            >
              {number}
            </button>
          </li>
        ))}
      </PageList>
      {inquiryDetail ? (
        <InquiryDetail
          inquiry={inquiry}
        />
      ) : null}
    </Container>
  );
}
