import styled from '@emotion/styled'
import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1 0 auto; /* grow to take available space */
`

export default function Index() {
    return (
        <Page>
            <Header />
            <Main>
                <Background />
            </Main>
            <Footer />
        </Page>
    )
}

