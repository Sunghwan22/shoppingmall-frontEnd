import { useState } from 'react';
import styled from 'styled-components';
import InquiryDetail from './InquiryDetail';

const PageList = styled.ul`
    display: flex;   
`;

export default function ProductInquiries(
  {
    inquiries, totalInquiryNumber, inquiryPageNumbers,
    onClickInquiryPageNumbers, onClickInquiry, inquiry,
    onClickWriteInquiry, onClickFindMyInquiries,
  },
) {
  const [inquiryDetail, setInquiryDetail] = useState(false);

  const handleClickPageNumber = (number) => {
    onClickInquiryPageNumbers(number);
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
    return <p>작성된 상품 문의가 없습니다</p>;
  }

  return (
    <div>
      <h2>
        Q&A
        {' '}
        {totalInquiryNumber}
      </h2>
      <button
        type="button"
        onClick={handleClickCreateInquiry}
      >
        상품 Q&A작성하기
      </button>
      <button
        type="button"
        onClick={handleClickMyInquiries}
      >
        나의 Q & A보기
      </button>
      <table>
        <thead>
          <tr>
            <th>답변상태</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((productInquiry) => (
            <tr
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
            </tr>
          ))}
        </tbody>
      </table>
      {inquiryDetail ? (
        <InquiryDetail
          inquiry={inquiry}
        />
      ) : null}
      <PageList>
        {inquiryPageNumbers.map((number) => (
          <li key={number}>
            <button
              type="button"
              onClick={() => handleClickPageNumber(number)}
              id={`inquiry-pageNumber${number}`}
            >
              {number}
            </button>
          </li>
        ))}
      </PageList>
    </div>
  );
}
