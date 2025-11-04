import styled from '@emotion/styled'
import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VoteList from "../components/VoteList";
import { Page, Main } from "../components/Page";

export default function Dashboard() {
    const data = [
        { id: 1, title: "전교회장 선거", finish: false, type: "school", year: 2025, vote_start: '2025-07-31T08:30:00', vote_end: '2025-07-31T11:00:00' },
        { id: 2, title: "2학기 학급회장 선거", finish: false, type: "class", year: 2025, grade: 2, class: 4, semester: 2, vote_start: '2025-08-02T08:30:00', vote_end: '2025-08-02T10:00:00' },
        { id: 3, title: "1학기 학급회장 선거", finish: true, type: "class", year: 2025, grade: 2, class: 4, semester: 1, vote_start: '2025-03-04T08:30:00', vote_end: '2025-03-04T10:00:00' },

    ]
    return (
        <Page>
            <Header />
            <Main>
                <Background />
                <VoteList list={data} />
            </Main>
            <Footer />
        </Page>
    )
}

