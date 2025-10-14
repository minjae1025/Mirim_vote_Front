import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Page, Main } from "../components/Page";

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