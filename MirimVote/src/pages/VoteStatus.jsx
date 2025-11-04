import styled from '@emotion/styled'
import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Page, Main } from "../components/Page";
import { Title } from "../components/VoteTitles";
import BackButtonText from "../assets/BackButtonText.png";
import { useState, useEffect } from 'react';
import { auth, getUser } from '../services/firebase.js';
import { onAuthStateChanged } from "firebase/auth";

const TopBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 20px;
`;

const BackButton = styled.button`
    width: 150px;
    height: 45px;
    border: 1px solid #888;
    background: #f9f9f9;
    margin-top: 20px;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 10px;
`;

const States = styled.div`
    position: relative;
    margin: 20px, 20px, 20px, 20px;
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StatusBox = styled.div`
    background: #f9f9f9;
    border-radius: 18px;
    box-shadow: 0 2px 8px rgba(44,94,62,0.08);
    border: 1.5px solid #dbeedb;
    width: 100%;
    max-width: 1200px;
    margin: 0px 0px 24px 0px;
`;

const StatesInnerBox = styled.div`
    padding: 32px 24px 12px 24px;
`

const StatusGrid = styled.div`
    display: flex;
    gap: 32px;
    justify-content: center;
    margin-bottom: 18px;
`;

const StatusItem = styled.div`
    flex: 1;
    background: #f3ffe9;
    border-radius: 16px;
    border: 1px solid #dbeedb;
    text-align: center;
    padding: 24px 0 18px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StatusNum = styled.div`
    font-size: 46px;
    font-weight: 400;
    color: #222;
    margin-bottom: 4px;
`;

const StatusLabel = styled.div`
    font-size: 18px;
    color: #666;
`;

const CandidateList = styled.div`
    margin-top: 18px;
`;

const CandidateRow = styled.div`
    margin-bottom: 18px;
`;

const CandidateName = styled.div`
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 6px;
`;

const BarWrap = styled.div`
    display: flex;
    align-items: center;
`;

const Bar = styled.div`
    height: 16px;
    border-radius: 8px;
    background: ${({ percent }) => percent > 0 ? "#4b7c5a" : "#bbb"};
    width: ${({ percent }) => percent}%;
    min-width: 24px;
    transition: width 0.3s;
    display: flex;
    align-items: center;
    justify-content: end;
`;

const BarBg = styled.div`
    background: #eee;
    border-radius: 8px;
    height: 16px;
    flex: 1;
    margin-right: 12px;
    box-shadow: 0 2px 4px rgba(44,94,62,0.06);
    overflow: hidden;
`;

const VoteCount = styled.div`
    font-size: 16px;
    font-weight: 400;
    margin-right: 12px;
    color: #222;
`;

const PercentText = styled.div`
    font-size: 12px;
    color: #f9f9f9;
    margin-left: 4px;
    font-weight: 400;
    margin-right: 6px;
`;

const CandidateInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    justify-content: space-between; 
`;

const ManagementBtnBox = styled.div`
    text-align: center;
    height: 40px;
    line-height: 40px;
`

const ManagementBtn = styled.button`
    display: block;
    width: 100%;
    height: 40px;
    font-size: 16px;
    background-color: #437F5A;
    color: #f9f9f9;
    border: 1px solid #222222;
    border-radius: 0px 0px 16px 16px;
    text-decoration: none;
`

const Label = styled.p`
    color: #222;
    font-size: 32px;
    font-weight: 600;
    margin: 0;
`

const StatusTitle = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: end;
`

const SubLabel = styled.p`
    color: #666;
    font-size: 16px;
    margin: 0;
    padding: 0 0 3px 5px;

`

export default function VoteResult(info = null) {
    // 예시 데이터
    const list = [
        {
            type: 'class',
            year: 2025,
            semester: 1,
            grade: 2,
            class: 4,
            totalVoters: 17,
            totalVotes: 17,
            status: "종료",
            candidates: [
                {
                    number: 1,
                    names: "김민재",
                    votes: 4,
                },
                {
                    number: 2,
                    names: "육준성",
                    votes: 10,
                },
                {
                    number: 3,
                    names: "이민준",
                    votes: 3,
                }
            ]
        },
        {
            type: 'class',
            year: 2025,
            semester: 2,
            grade: 2,
            class: 4,
            totalVoters: 17,
            totalVotes: 17,
            status: "종료",
            candidates: [
                {
                    number: 1,
                    names: "김민재",
                    votes: 4,
                },
                {
                    number: 2,
                    names: "육준성",
                    votes: 10,
                },
                {
                    number: 3,
                    names: "이민준",
                    votes: 3,
                }
            ]
        }
    ];

    const [userData, setUserData] = useState(null);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const fetchedData = await getUser(uid);
                setUserData(fetchedData.user);
                setLoading(false);
            } else {
                console.log('redirecting to /');
                window.location.href = '/';
            }
        });

        return () => unsubscribe();
    }, [])



    if (loading) return null; // 초기 렌더링 없이 대기

    const renderVotes = () => {
        return list.map((data, index) => {
            const percent = Math.round((data.totalVotes / data.totalVoters) * 100);
            const candidatePercents = data.candidates.map(c => data.totalVotes === 0 ? 0 : Math.round((c.votes / data.totalVotes) * 100));
            const label = data.type == 'school' ? `전교회장 선거` : `${data.semester}학기 학급회장 선거`;
            return (
                <States key={index}>
                    <StatusTitle>
                        <Label>{label}</Label>
                        <SubLabel>{`${data.year}학년도 ${data.type == 'class' ? `${data.grade}학년 ${data.class}반` : '' } `}</SubLabel>
                    </StatusTitle>
                    <StatusBox>
                        <StatesInnerBox>
                            <StatusGrid>
                                <StatusItem>
                                    <StatusNum>{data.totalVotes}<span style={{ fontSize: "20px", fontWeight: "400" }}>/{data.totalVoters}</span></StatusNum>
                                    <StatusLabel>투표수</StatusLabel>
                                </StatusItem>
                                <StatusItem>
                                    <StatusNum>{percent}%</StatusNum>
                                    <StatusLabel>투표율</StatusLabel>
                                </StatusItem>
                                <StatusItem>
                                    <StatusNum>{data.status}</StatusNum>
                                    <StatusLabel>상태</StatusLabel>
                                </StatusItem>
                            </StatusGrid>
                            <CandidateList>
                                {data.candidates.map((c, idx) => (
                                    <CandidateRow key={c.number}>
                                        <CandidateInfo>
                                            <CandidateName>{c.number}. {c.names}</CandidateName>
                                            <VoteCount>{c.votes}표</VoteCount>
                                        </CandidateInfo>
                                        <BarWrap>
                                            <BarBg>
                                                <Bar percent={candidatePercents[idx]}><PercentText>{candidatePercents[idx]}%</PercentText></Bar>
                                            </BarBg>
                                        </BarWrap>
                                    </CandidateRow>
                                ))}
                            </CandidateList>
                        </StatesInnerBox>
                        {userData.type == 'teacher' ? <ManagementBtnBox>
                            <ManagementBtn onClick={() => { window.location.href = `/vote/management?type=${data.type}&year=${data.year}${data.type == 'class' ? `&semester=${data.semester}&grade=${data.grade}&class=${data.class}` : null }`}}>
                                관리하기
                            </ManagementBtn>
                        </ManagementBtnBox>
                            : null}

                    </StatusBox>
                </States>
            );
        });
    };

    return (
        <Page>
            <Header />
            <Main>
                <Background />
                <TopBox>
                    <BackButton>
                        <img src={BackButtonText} alt="Back" width="66%" onClick={() => window.location.href = '/dashboard'} />
                    </BackButton>
                    <Title style={{ width: "70%", position: 'absolute', left: "50%", transform: "translateX(-50%)" }}>투표 상황 및 결과</Title>
                </TopBox>
                {renderVotes()}
            </Main>
            <Footer />
        </Page>
    );
}

// function