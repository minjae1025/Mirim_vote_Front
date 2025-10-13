import styled from '@emotion/styled'
import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Page, Main } from "../components/Page";
import { useState, useEffect } from "react";

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  display: flex;
  width: 66%;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  border: 2px solid ${({ selected }) => (selected ? "#4b7c5a" : "#222")};
  padding: 24px;
  cursor: pointer;
  
  transition: box-shadow 0.2s, border 0.2s;
`;

const Number = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #e6f4e6;
  border: 1px solid #666;
  color: #288157;
  font-size: 48px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Names = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Desc = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: #444;
`;

const SelectedInfo = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Button = styled.button`
  display: block;
  margin: 0 auto;
  background: #288157;
  color: #fff;
  font-size: 28px;
  font-weight: 400;
  border: none;
  border-radius: 12px;
  padding: 12px 64px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 40px;
  &:hover {
    background: #35603f;
  }
`;

const Title = styled.p`
  text-align: center;
  font-size: 42px;
  font-weight: 600;
  margin: 32px 0 8px;
  color: #222;
`;

const SubTitle = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  margin: 16px 0;
  color: #444;
`;

const url = new URL(window.location.href);
const urlParams = url.searchParams;
const year = urlParams.get('year');
const type = urlParams.get('type');

export default function Vote() {
    const [selected, setSelected] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://api.example.com/users')
            .then(response => response.json())
            .then(data => setData(data));
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    const candidates = data || type == 'school' ? [
        {
            number: 1,
            name1: "이민준",
            name2: "김민재",
            desc: "저희 반 모든 학생이 민재를 좋아하게 만들도록 노력하겠습니다",
        },
        {
            number: 2,
            name1: "전유림",
            name2: "육준성",
            desc: "저희 반 모든 학생이 판다를 좋아하게 만들도록 노력하겠습니다",
        },
    ] : [
        {
            number: 1,
            name: "김민재",
            desc: "저희 반 모든 학생이 민준이를 좋아하게 만들도록 노력하겠습니다",
        },
        {
            number: 2,
            name: "이민준",
            desc: "저희 반 모든 학생이 민재를 좋아하게 만들도록 노력하겠습니다",
        },
        {
            number: 3,
            name: "육준성",
            desc: "저희 반 모든 학생이 민준이를 좋아하게 만들도록 노력하겠습니다",
        }
    ];
    return (
        <Page>
            <Header />
            <Background />
            <Main>
                <Title>{type === 'school' ? '전교회장 선거' : `${urlParams.get('grade')}학년 ${urlParams.get('class')}반 학급회장 선거`}</Title>
                <SubTitle>{type === 'school' ? `${year}학년도` : `${year}학년도 ${urlParams.get('semester')}학기`}</SubTitle>
                <CardList style={{ alignItems: "center" }}>
                    {candidates.map((c) => (
                        <Card
                            key={c.number}
                            selected={selected === c.number}
                            onClick={() => setSelected(c.number)}
                            style={{
                                boxShadow: selected === c.number ? "6px 6px 0 #4b7c5a" : "none",
                                border: selected === c.number ? "3px solid #4b7c5a" : "1.5px solid #222",
                            }}
                        >
                            <Number>{c.number}</Number>
                            <CardInfo>
                                <Names>{type === 'school' ? `${c.name1} / ${c.name2}` : c.name}</Names>
                                <Desc>{c.desc}</Desc>
                            </CardInfo>
                        </Card>
                    ))}
                </CardList>
                <SelectedInfo>
                    {selected ? `선택한 후보 : ${selected}번` : "후보를 선택해주세요."}
                </SelectedInfo>
                <Button onClick={() => handleSubmit(selected)}>선택 완료</Button>
            </Main>
            <Footer />
        </Page>
    );
}

function handleSubmit(selected) {
    // 선택한 후보를 서버에 제출
    if (!selected) {
        alert("후보를 선택해주세요.");
        return;
    }
    let body = {
        year: year,
        selected: selected,
    };
    
    if(type === 'class') {
        body.class = urlParams.get('class');
        body.grade = urlParams.get('grade');
        body.semester = urlParams.get('semester');
    }

    window.location.href = "/vote/vote-end";

    //이 아래코드는 실제로 연동할때 사용할 코드
    
    // fetch('https://api.example.com/submit-vote', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ body }),
    // }).then(res => {
    //   if(res.ok) {
    //     window.location.href = "/vote/vote-end";
    //   }
    // }).catch(err => {
    //   alert("오류가 발생했습니다. 다시 시도해주세요.")
    // });
    
}