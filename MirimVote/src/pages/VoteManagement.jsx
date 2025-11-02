import styled from '@emotion/styled'
import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Page, Main } from "../components/Page";
import { Title, SubTitle } from "../components/VoteTitles";


const SaveBtn = styled.button`
`;

const CancelBtn = styled.button`
`;

const TitleBox = styled.div`
`;

const TitleText = styled.div`
`;

export default function VoteManagers() {
    return (
        <Page>
            <Header />
            <Main>
                <Background />
                <TitleBox>
                    <SaveBtn>저장</SaveBtn>
                    <CancelBtn>취소</CancelBtn>
                    <TitleText>
                        <Title>{"전교회장 선거 관리"}</Title>
                        <SubTitle>{"2025학년도"}</SubTitle>
                    </TitleText>
                </TitleBox>
            </Main>
            <Footer />
        </Page>
    )
}