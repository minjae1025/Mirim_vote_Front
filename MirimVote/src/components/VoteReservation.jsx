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

const VoteReservationBox = styled.div`
    border: 1px solid #666666;
    border-radius: 20px;
    background-color: #f9f9f9;
    padding: 32px;
`

const VoteReservatioInput = styled.div`
    display: flex;
    justify-content: space-between;
    
`

const ReservationTextBox = styled.div``

const ReservationTitle = styled.p`
    font-size: 20px;
    margin: 0;
    color: #222222;
    font-weight: 600;
`

const ReservationContent = styled.p`
    font-size: 12px;
    margin: 0;
    color: #444444;
`

const ButtonBox = styled.div``

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const SwitchInput = styled.input`
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

const SwitchSlider = styled.span`
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

const InputDateBox = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const DateInputContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;

    label {
        width: 80px;
    }
`;

const DateInput = styled.input`
    border: 1px solid #888888;
    border-radius: 10px;
    padding: 8px;
    font-size: 16px;
    flex: 1;
`;

export default function VoteReservation({ isReservationEnabled, setIsReservationEnabled: handleReservationToggle, startDate, setStartDate, startTime, setStartTime, endDate, setEndDate, endTime, setEndTime }) {

    return (
        <Box>
            <Label>투표 예약</Label>
            <VoteReservationBox>
                <VoteReservatioInput>
                    <ReservationTextBox>
                        <ReservationTitle>투표예약</ReservationTitle>
                        <ReservationContent>투표 예약을 활성화 하면 에약한 시간에 자동으로 시작합니다</ReservationContent>
                    </ReservationTextBox>
                    <ButtonBox>
                        <SwitchContainer>
                            <SwitchInput type="checkbox" checked={isReservationEnabled} onChange={handleReservationToggle} />
                            <SwitchSlider className="slider" />
                        </SwitchContainer>
                    </ButtonBox>
                </VoteReservatioInput>
                {isReservationEnabled && (
                    <InputDateBox>
                        <DateInputContainer>
                            <label>시작 일자</label>
                            <DateInput type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                            <label>시작 시간</label>
                            <DateInput type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                        </DateInputContainer>
                        <DateInputContainer>
                            <label>종료 일자</label>
                            <DateInput type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                            <label>종료 시간</label>
                            <DateInput type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                        </DateInputContainer>
                    </InputDateBox>
                )}
                
            </VoteReservationBox>
        </Box>
    );
}