import styled from '@emotion/styled'
import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Page, Main } from "../components/Page"

const Title = styled.div`

`;

const SaveBtn = styled.button`
`;

const CancelBtn = styled.button`
`;

const TitleText = styled.div`
`;

const MainTitleText = styled.div`
`;

const SubTitleText = styled.div`
`;

export default function VoteManagers() {
    return (
        <Page>
            <Header />
            <Main>
                <Background />
                <Title>
                    <SaveBtn>저장</SaveBtn>
                    <CancelBtn>취소</CancelBtn>
                    <TitleText>
                        <MainTitleText>{}</MainTitleText>
                        <SubTitleText>{}</SubTitleText>
                    </TitleText>
                </Title>
            </Main>
            <Footer />
        </Page>
    )
}