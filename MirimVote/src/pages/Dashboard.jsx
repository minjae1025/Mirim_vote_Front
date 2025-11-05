import styled from '@emotion/styled'
import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VoteList from "../components/VoteList";
import { Page, Main } from "../components/Page";
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fecthdata() {
            try {
                const response = await fetch('http://localhost:3000/apivoteschool-president?year=2025')
                const data = await response.json()
                console.log(data);
                setData(data)
            }
            catch (error) {
                console.log("에러 발생 : ", error);
            }
        }
        fecthdata();
    }, [])
    // const data = [
    //     { id: 1, title: "전교회장 선거", finish: false, type: "school", year: 2025 },
    //     { id: 2, title: "2학기 학급회장 선거", finish: false, type: "class", year: 2025, grade: 2, class: 4, semester: 2 },
    //     { id: 3, title: "1학기 학급회장 선거", finish: true, type: "class", year: 2025, grade: 2, class: 4, semester: 1 },

    // ]
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

