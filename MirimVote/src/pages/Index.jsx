import styled from '@emotion/styled';
import Background from "../components/Background";
import Footer from "../components/Footer";
import { auth, provider } from '../services/firebase.js';
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Main = styled.main`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
`

const Title = styled.h1`
  font-size: 120px;
  margin: 40px 0 60px;
  color: #222;
  text-align: center;
  text-shadow: 0 6px 10px rgba(0,0,0,0.08);
`

const Card = styled.div`
  width: 540px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  padding: 32px;
  text-align: center;

  h2 {
    font-size: 50px;
    margin: 0 0 8px;
  }
`

const GoogleBtn = styled.button`
  background: #2e7d52;
  color: white;
  border: none;
  width: 500px;
  height: 80px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 24px;
  margin-top: 18px;
`

export default function Index() {
    onAuthStateChanged(auth, async (user) => {
            // console.log('Auth state changed:', user);
            if (user) {
                window.location.href = "/dashboard";
            }
        });

    return (
        <Page>
            <Main>
                <Title>Mirim Vote</Title>
                <Card>
                    <h2>로그인</h2>
                    <p style={{ color: '#777', fontSize: 18 }}>안전하고 편리하게 학교 Google 계정으로 로그인 하세요!</p>
                    <GoogleBtn onClick={loginWithGoogle}>Google 로그인</GoogleBtn>
                </Card>
                <Background />
            </Main>
            <Footer />
        </Page>
    )
}

function loginWithGoogle() {
    // Firebase Google 로그인 로직 구현
     signInWithPopup(auth, provider)
        .then(async (result) => {
            // 로그인 성공
            const user = result.user;
            const idToken = await user.getIdToken();

            // ID 토큰 가져오기
            console.log("ID Token:", idToken);

            // 백엔드 서버로 ID 토큰 전송
            await fetch('http://localhost:3000/auth/google/', { // 추후 준성 백엔드 URL로 변경
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: idToken }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Backend response:', data);
                    window.location.href = '/dashboard'; // 로그인 후 대시보드로 리다이렉트
                })
                .catch(error => console.error('Error sending token to backend:', error));
        })
        .catch((error) => {
            console.error("Authentication failed.", error);
        });
}
