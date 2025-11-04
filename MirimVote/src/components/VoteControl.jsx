import styled from '@emotion/styled'

const VoteControlBox = styled.div`
    border: 1px solid #666666;
    border-radius: 20px;
    background-color: #f9f9f9;
    padding: 32px;
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

export default function VoteControl() {
    return (
        <Box>
            <Label>투표 제어</Label>
            <VoteControlBox>

            </VoteControlBox>
        </Box>
    );
}