export default function InquiryDetail(
  { inquiry },
) {
  return (
    <div>
      <p>{inquiry.content}</p>
      {inquiry.answers
        ? inquiry.answers.map((answer) => (
          <ul>
            <li key={answer.id}>
              답변
              {' '}
              {answer.comment}
            </li>
            <p>{answer.createdAt}</p>
          </ul>
        )) : null}
    </div>
  );
}
