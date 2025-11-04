import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react'
import { auth, getUser } from '../services/firebase.js';
import { onAuthStateChanged } from "firebase/auth";

const Container = styled.div`
    margin: 20px;
`

const Label = styled.p`
    color: #222;
    font-size: 32px;
    font-weight: 600;
    margin: 0;
    margin-top: 20px;
`

const VoteCard = styled.div`
    display: inline-block;
    max-width: 450px;
    width: 100%;
    height: 150px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin: 10px 20px 10px 0px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    vertical-align: top;
`

const Title = styled.p`
    margin: 0;
    font-size: 28px;
    font-weight: 600;
    color: #333;
`

const Info = styled.p`
    margin: 0;
    font-size: 16px;
    margin-bottom: 5px;
    color: #444;
`

const Time = styled.p`
    font-size: 14px;
    color: #444;
    text-align: right;
    margin: 14px 0px 0px 0px;
`

const VoteButton = styled.button`
    background-color: #288157;
    color: white;
    border: none;
    border-radius: 0px 0px 10px 10px;
    width: 100%;
    height: 46px;
    font-size: 20px;
    cursor: pointer;
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px;
`

const PresentVote = styled.div`
`

    const VoteAddBtn = styled.div`
        height: 150px;
        width: 150px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 10px;
        margin: 10px 20px 10px 0px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        vertical-align: top;
        padding: 0;

        .plus {
            position: relative;
            width: 64px;
            height: 64px;
            display: inline-block;
        }

        .plus .bar {
            position: absolute;
            left: 50%;
            top: 50%;
            background: #437F5A;
            transform-origin: center;
        }

        .plus .bar.horizontal {
            width: 64px;
            height: 6px;
            transform: translate(-50%, -50%);
            border-radius: 4px;
        }

        .plus .bar.vertical {
            width: 6px;
            height: 64px;
            transform: translate(-50%, -50%);
            border-radius: 4px;
        }

        &:hover .plus .bar {
            background: #2f6f47;
        }
    `

export default function VoteList({ list }) {
    const now = new Date('2025-07-31T09:30:00'); // 테스트용 현재 시간;

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const initialAuthCheckDone = useRef(false);

    useEffect(() => {
        if (initialAuthCheckDone.current) return;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const fetchedData = await getUser(uid);
                setUserData(fetchedData.user);
                setLoading(false);
                initialAuthCheckDone.current = true;
            } else {
                console.log('redirecting to /');
                window.location.href = '/';
            }
        });

        return () => unsubscribe();
    }, [])

    const renderVotes = (isFinished) => {
        if (!Array.isArray(list)) return null;

        return list.map(vote => {
            // normalize finish to boolean to avoid type mismatches (string/number)
            const finished = (vote.finish === true) || (String(vote.finish) === 'true') || (Number(vote.finish) === 1);
            if (finished !== isFinished) return null;

            let isStarted;
            let vote_time;

            if (new Date(vote.vote_start) >= now) {
                isStarted = false;
                vote_time = new Date(vote.vote_start).toLocaleString();
            } else {
                isStarted = true;
                vote_time = Math.floor((new Date(vote.vote_end) - now) / 1000 / 60);
            }

            const btnDisabled = !isStarted;

            let url_parameters = `&type=${vote.type}&year=${vote.year}`; // URL 파라미터
            if (vote.type === "class") {
                url_parameters += `&semester=${vote.semester}&grade=${vote.grade}&class=${vote.class}`;
            }

            const button_text = isFinished ? '결과 보기' : '투표하기';
            const button_style = isStarted ? { backgroundColor: '#288157' } : { backgroundColor: '#666', cursor: 'not-allowed' };
            return (
                <VoteCard key={vote.id}>
                    <Box>
                        <Title>{vote.title}</Title>
                        <Info>{vote.type === "class" ? `${vote.year}학년도 ${vote.grade}학년 ${vote.class}반` : `${vote.year}학년도`}</Info>
                        <Time>{isStarted ? (isFinished ? `종료 : ${new Date(vote.vote_end).toLocaleString()}` : `남은 시간 : ${Math.floor(vote_time / 60)}시간 ${vote_time % 60}분`) : `시작 예정 : ${vote_time}`}</Time>
                    </Box>
                    <VoteButton style={button_style} onClick={() => { location.href = isFinished ? `/vote/result?${url_parameters}` : `/vote/${vote.type}-president?${url_parameters}` }} disabled={btnDisabled}>
                        {button_text}
                    </VoteButton>
                </VoteCard>
            );
        });
    };

    if (loading) 
        return; // 초기 렌더링 없이 대기

    return (
        <Container>
            <Label>진행 및 예정된 선거</Label>
            <PresentVote>
                    {renderVotes(false)}
                    {userData.type == 'teacher'? (
                        <VoteAddBtn onClick={() => { window.location.href = "/vote/add" }}>
                            <div className="plus">
                                <div className="bar horizontal" />
                                <div className="bar vertical" />
                            </div>
                        </VoteAddBtn>
                    ) : null}
            </PresentVote>
            <Label>종료된 선거</Label>
            {renderVotes(true)}
        </Container>
    );
}