import styled from '@emotion/styled'
import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Page, Main } from "../components/Page";
import { Title, SubTitle } from "../components/VoteTitles";
import VoteControl from "../components/VoteControl";  
import VoteManage from '../components/VoteManage';
import { useEffect, useRef, useState } from 'react';

const TitleBtn = styled.button`
    width: 120px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #888888;
    background-color: #F9F9F9;
    cursor: pointer;
    font-size: 24px;
    margin-left: 8px;
    font-family: "Pretendard Variable", Pretendard, system-ui, Roboto, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    color: ${props => props.color || 'black'};
`;

const FormBox = styled.form`
    /* display: flex; */
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
`;

const TitleText = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const TitleBtnBox = styled.div`
    margin-top: 24px;
`;

const TitleBox = styled.div`
    display: flex;
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px;
`

const Label = styled.p`
    color: #222;
    font-size: 32px;
    font-weight: 600;
    margin: 20px 0 10px 3px;
`

const CandidateBox = styled.div`
    border: 1px solid #666666;
    border-radius: 20px;
    background-color: #f9f9f9;
    padding: 32px;
    display: grid;
    gap: 24px;
`

const InputCandidate = styled.div`
    display: flex;
    border: 1px solid #888888;
    border-radius: 10px;
    background-color: #EFFFEF;
`

const NumberBox = styled.div`
    width: 40px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #888888;
    margin: -0.5px;
    border-radius: 10px;
    color: #437F5A;
    font-size: 36px;
    font-weight: bold;
`

const InputName = styled.input`
    border: none;
    margin-left: 10px;
    background-color : rgb(255,255,255, 0);
    font-size: 28px;
    flex: 1;

    :focus {
        outline: none;
    }
`

const DeleteButton = styled.button`
    width: 60px;
    height: 60px;
    border: 0px;
    border-radius: 0px 10px 10px 0px;
    background: none;
    color: #dc3545;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
        background-color: rgba(220, 53, 69, 0.1);
    }
`

const AddCandidate = styled.button`
    background-color: #EFFFEF;
    border: 1px solid #888888;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
`

import { useLocation } from 'react-router-dom';

export default function VoteManagers() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const voteType = queryParams.get('type');
    const year = queryParams.get('year');
    const semester = queryParams.get('semester');
    const grade = queryParams.get('grade');
    const classNum = queryParams.get('class');

    const [candidates, setCandidates] = useState([]);
    const [isAutoStopEnabled, setIsAutoStopEnabled] = useState(false);
    const [voterCount, setVoterCount] = useState(1);
    const [isStart, setIsStart] = useState(false);

    const data = {
        candidates: [{ name1: '이민준', name2: '김민재' }, { name1: '육준성', name2: '전유리' }],
    }

    useEffect(() => {
        const initialCandidates = data.candidates.map(item => ({
            name: voteType === 'school' ? `${item.name1},${item.name2}` : `${item.name}`,
            isNew: false
        }));
        setCandidates(initialCandidates);
    }, [voteType]);

    const addName = () => {
        setCandidates([...candidates, { name: '', isNew: true }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const voteData = {
            candidates,
            isAutoStopEnabled,
            voterCount,
            isStart,
            voteType,
            year,
            semester,
            grade,
            classNum
        };
        console.log("서버로 보낼 데이터 (React State):", voteData);
        try {
            const response = await fetch(`http://localhost:3000/vote/update/${voteType}` , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(voteData)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOptionChange = (index, value) => {
        const newCandidates = [...candidates];
        newCandidates[index] = { ...newCandidates[index], name: value };
        setCandidates(newCandidates);
    };

    const handleDelete = (index) => {
        setCandidates(candidates.filter((_, i) => i !== index));
    };

    const renderCandidates = () => {
        return candidates.map((candidate, index) => {
            return (
                <InputCandidate key={index}>
                    <NumberBox>
                        {index + 1}
                    </NumberBox>
                    <InputName
                        name='names[]'
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        value={candidate.name}
                        placeholder={candidate.isNew ? "ex) 김ㅇㅇ, 이ㅁㅁ" : ""}
                    />
                    <DeleteButton
                        type="button"
                        onClick={() => handleDelete(index)}
                    >
                        삭제
                    </DeleteButton>
                </InputCandidate>
            );
        });
    };

    return (
        <Page>
            <Header />
            <Main>
                <Background />
                <FormBox onSubmit={handleSubmit}>
                    <TitleBox>
                        <TitleBtnBox>
                            <TitleBtn type='submit'>저장</TitleBtn>
                            <TitleBtn type='button' onClick={() => { window.history.back() }} color="red">취소</TitleBtn>
                        </TitleBtnBox>
                        <TitleText>
                            <Title>{voteType == 'school' ? `전교회장 선거` : `${semester}학기 학급회장 선거`}</Title>
                            <SubTitle>{`${year}학년도 ${voteType == 'class' ? `${grade}학년 ${classNum}반` : ''} `}</SubTitle>
                        </TitleText>
                    </TitleBox>
                    <Box>
                        <Label>후보자 관리</Label>
                        <CandidateBox>
                            {renderCandidates()}
                            <AddCandidate type="button" onClick={addName}>후보 추가</AddCandidate>
                        </CandidateBox>
                    </Box>
                    <VoteControl 
                        isStart={isStart}
                        setIsStart={setIsStart}
                    />
                    <VoteManage 
                        isAutoStopEnabled={isAutoStopEnabled}
                        setIsAutoStopEnabled={setIsAutoStopEnabled}
                        voterCount={voterCount}
                        setVoterCount={setVoterCount}
                    />
                </FormBox>
            </Main>
            <Footer />
        </Page>
    )
}