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
    position: relative;
    justify-content: center;
    align-items: center;
`;

const BackButton = styled.button`
    position: absolute;
    left: 100px;
    top: 25px;
    width: 150px;
    height: 50px;
    border: 1px solid #888;
    border-radius: 10px;
    cursor: pointer;
`;

export default function VoteResult() {
    return (
        <Page>
            <Header />
            <Main>
                <Background />
                <TopBox>
                    <BackButton><img src={BackButtonText} alt="Back" width="100%" onClick={() => window.history.back()} /></BackButton>
                    <Title>투표 상황 및 결과</Title>
                </TopBox>
            </Main>
            <Footer />
        </Page>
    );
}

// function 