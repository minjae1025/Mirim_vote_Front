import styled from '@emotion/styled'
import { useState } from 'react';

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

const VoteControlBox = styled.div`
    border: 1px solid #666666;
    border-radius: 20px;
    background-color: #f9f9f9;
    padding: 32px;
`

const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
`;

const SwitchLabel = styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #333;
`;

const SwitchWrapper = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
`;

const HiddenCheckbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
        background-color: #437F5A;
    }

    &:focus + .slider {
        box-shadow: 0 0 1px #437F5A;
    }

    &:checked + .slider:before {
        transform: translateX(26px);
    }
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;

    &:before {
        position: absolute;
        content: "";
        height: 30px;
        width: 30px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
`;

const SwitchContent = styled.div`
    font-size: 12px;
    margin: 0;
    color: #444444;
`

const SwitchTextBox = styled.div``

export default function VoteControl({ isStart, setIsStart }) {
    return (
        <Box>
            <Label>투표 제어</Label>
            <VoteControlBox>
                <SwitchContainer>
                    <SwitchTextBox>
                        <SwitchLabel>투표 진행</SwitchLabel>
                        <SwitchContent>활성화하면 투표가 진행됩니다</SwitchContent>
                    </SwitchTextBox>
                    <SwitchWrapper>
                        <HiddenCheckbox type="checkbox" checked={isStart} onChange={() => setIsStart(!isStart)} />
                        <Slider className="slider"></Slider>
                    </SwitchWrapper>
                </SwitchContainer>
            </VoteControlBox>
        </Box>
    );
}