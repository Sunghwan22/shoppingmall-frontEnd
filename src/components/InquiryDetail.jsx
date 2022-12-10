import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding-top: 2em;
  padding-bottom: 2em;
  /* padding-left: 2em; */
  background-color: #f7f8fa;
  border: 1px solid #eaeced;
  margin-top: 2em;
`;

const GuideMessage = styled.p`
    width: 100%;
    padding-top: 2em;
    font-size: 1.5em;
    color: red;
`;

const InquiryContent = styled.p`
  width: 100%;
  font-size: 1.5em;
  padding-bottom: 1em;
  border-bottom: 1px solid #D9D9D9;
  margin-bottom: 1em;
  padding-left: 2em;
`;

const NoanswerText = styled.p`
  margin-left: 2.5em;
  font-size: 1.2em;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;

  p:first-child {
    margin-left: 2em;
    padding: .3em;
    font-size: 1.2em;
    border: 1px solid white;
    background-color: #35992D;
    color: white;
    margin-right: .3em;
  }

  p {
    font-size: 1.2em;
  }
`;

export default function InquiryDetail(
  { inquiry },
) {
  if (!inquiry) {
    return (<p>삭제된 문의 입니다</p>);
  }

  if (inquiry.content === '접근 권한이 없습니다') {
    return (<GuideMessage>접근 권한이 없습니다</GuideMessage>);
  }

  return (
    <Container>
      <InquiryContent>{inquiry.content}</InquiryContent>
      <ul>
        {inquiry.answers.length ? inquiry.answers.map((answer) => (
          <ListItem key={answer.id}>
            <p>
              답변
            </p>
            <p>
              {answer.comment}
            </p>
            <p>{answer.createdAt}</p>
          </ListItem>
        ))
          : <NoanswerText>작성된 답변이 없습니다</NoanswerText>}
      </ul>
    </Container>
  );
}
