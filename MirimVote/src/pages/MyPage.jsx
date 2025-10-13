import styled from '@emotion/styled'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 20px;
  background: #eafcf0;
`

const Card = styled.div`
  width: 900px;
  background: #fafafa;
  border-radius: 10px;
  padding: 28px;
  box-shadow: 0 8px 22px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.06);
`

const BackButton = styled.button`
  background: transparent;
  border: 1px solid #cfe9d7;
  color: #0b472f;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 12px;
`

const Title = styled.h2`
  text-align: center;
  font-size: 32px;
  margin: 6px 0 24px;
`

const Label = styled.label`
  display: block;
  margin: 18px 0 8px;
  font-size: 14px;
  color: #222;
`

const Input = styled.div`
  background: #eafeec;
  border: 1px solid #cfe9d7;
  border-radius: 14px;
  padding: 16px 18px;
  font-size: 20px;
  color: #0b472f;
`

const Row = styled.div`
  display: flex;
  gap: 18px;
`

const Half = styled.div`
  flex: 1;
`
export default function MyPage() {
  const navigate = useNavigate()
  return (
    <Page>
      <Header />
      <Main>
        <Card>
          <BackButton onClick={() => navigate(-1)}>← 대시보드</BackButton>
          <Title>이민준님의 기본 정보</Title>

          <Label>이름</Label>
          <Input>이민준</Input>

          <Label>이메일</Label>
          <Input>s2409@e-mirim.hs.kr</Input>

          <Row>
            <Half>
              <Label>학년</Label>
              <Input>2학년</Input>
            </Half>
            <Half>
              <Label>반</Label>
              <Input>4반</Input>
            </Half>
          </Row>

        </Card>
      </Main>
      <Footer />
    </Page>
  )
}
