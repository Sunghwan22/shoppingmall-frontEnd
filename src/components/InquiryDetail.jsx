export default function InquiryDetail(
  { inquiry },
) {
  return (
    <div>
      <p>{inquiry.content}</p>
      <ul>
        {inquiry.answers ? inquiry.answers.map((answer) => (
          <li key={answer.id}>
            답변
            {' '}
            {answer.comment}
            <p>{answer.createdAt}</p>
          </li>
        ))
          : <p>작성된 답변이 없습니다</p>}
      </ul>
    </div>
  );
}
