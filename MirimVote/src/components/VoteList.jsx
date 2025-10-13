import styled from '@emotion/styled'

const Container = styled.div`
    margin: 20px;
`

const Label = styled.p`
    color: #222;
    font-size: 36px;
    font-weight: 600;
    margin: 0;
`

const VoteCard = styled.div`
    display: inline-block;
    width: 450px;
    height: 180px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 10px 20px 10px 0px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`

const Title = styled.p`
    margin: 0;
    font-size: 36px;
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
    font-size: 16px;
    color: #444;
    text-align: right;
    margin: 14px 0px 0px 0px;
`

const VoteButton = styled.button`
    background-color: #288157;
    color: white;
    border: none;
    border-radius: 0px 0px 8px 8px;
    width: 100%;
    height: 60px;
    font-size: 16px;
    cursor: pointer;
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`

export default function VoteList({ list }) {
    const now = new Date('2025-07-31T09:30:00'); // 테스트용 현재 시간;
    // console.log(list);

    const renderVotes = (isFinished) => {
        return list.map(vote => {
            if (vote.finish !== isFinished) return null;
            let isStarted;
            let vote_time;

            if (new Date(vote.vote_start) >= now) {
                isStarted = false;
                vote_time = new Date(vote.vote_start).toLocaleString();
                VoteButton.disabled = true;
            } else {
                isStarted = true;
                vote_time = Math.floor((new Date(vote.vote_end) - now) / 1000 / 60);
            }

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
                    <VoteButton style={button_style} onClick={() => { isFinished ? location.href = `/api/vote/${vote.type}-president?${url_parameters}` : location.href = `vote/${vote.type}-president?${url_parameters}` }}>{button_text}</VoteButton>
                </VoteCard>
            );
        });
    };

    return (
        <Container>
            <Label>진행 및 예정된 선거</Label>
            {renderVotes(false)}
            <Label>종료된 선거</Label>
            {renderVotes(true)}
        </Container>
    );
}