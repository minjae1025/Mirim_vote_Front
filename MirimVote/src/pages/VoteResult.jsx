import styled from '@emotion/styled'
import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Page, Main } from "../components/Page";
import { Title } from "../components/VoteTitles";
import BackButtonText from "../assets/BackButtonText.png";

const url = new URL(window.location.href);
const urlParams = url.searchParams;
const year = urlParams.get('year');
const type = urlParams.get('type');

const TopBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-items: center;
`;

const BackButton = styled.button`
    position: absolute;
    left: 4%;
    width: 150px;
    height: 45px;
    border: 1px solid #888;
    border-radius: 10px;
    cursor: pointer;
`;

const States = styled.div`
    position: relative;
    margin: 20px, 20px, 20px, 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StatusBox = styled.div`
    background: #f9f9f9;
    border-radius: 18px;
    box-shadow: 0 2px 8px rgba(44,94,62,0.08);
    border: 1.5px solid #dbeedb;
    padding: 32px 24px 32px 24px;
    width: 90%;
    max-width: 1500px;
    margin: 0 auto 32px auto;
`;

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

export default function VoteResult(info = null) {
    // 예시 데이터
    const totalVotes = 17;
    const totalVoters = 17;
    const percent = Math.round((totalVotes / totalVoters) * 100);
    const status = "종료";
    const candidates = [
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
    ];
    const candidatePercents = candidates.map(c => totalVotes === 0 ? 0 : Math.round((c.votes / totalVotes) * 100));

    return (
        <Page>
            <Header />
            <Main>
                <Background />
                <TopBox>
                    <BackButton>
                        <img src={BackButtonText} alt="Back" width="66%" onClick={() => window.history.back()} />
                    </BackButton>
                    <Title style={{ width: "70%" }}>투표 상황 및 결과</Title>
                </TopBox>
                <States>
                    <StatusBox>
                        <StatusGrid>
                            <StatusItem>
                                <StatusNum>{totalVotes}<span style={{ fontSize: "20px", fontWeight: "400" }}>/{totalVoters}</span></StatusNum>
                                <StatusLabel>투표수</StatusLabel>
                            </StatusItem>
                            <StatusItem>
                                <StatusNum>{percent}%</StatusNum>
                                <StatusLabel>투표율</StatusLabel>
                            </StatusItem>
                            <StatusItem>
                                <StatusNum>{status}</StatusNum>
                                <StatusLabel>상태</StatusLabel>
                            </StatusItem>
                        </StatusGrid>
                        <CandidateList>
                            {candidates.map((c, idx) => (
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
                    </StatusBox>
                </States>
            </Main>
            <Footer />
        </Page>
    );
}

// function