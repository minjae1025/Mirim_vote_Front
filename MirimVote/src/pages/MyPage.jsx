import styled from '@emotion/styled'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BackButtonText from "../assets/BackButtonText.png";
import { auth, getUser } from '../services/firebase.js';

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
  border-radius: 20px;
  box-shadow: 0 8px 22px rgba(0,0,0,0.08);
  border: 1px solid #288157;
`

const BackButton = styled.button`
  background: transparent;
  width: 150px;
  height: 50px;
  border: 1px solid #288157;
  border-width: 0 1px 1px 0;
  color: #0b472f;
  border-radius: 19px 0;
  cursor: pointer;
`

const ButtonContainer = styled.div`
  align-items: left;
  padding-left: 0px;
  
`

const Title = styled.h2`
  text-align: center;
  font-size: 32px;
  margin: 0;
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

const BodyContent = styled.div`
  padding: 28px
`

export default function MyPage() {
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const avatarRef = useRef(null);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            // console.log('Auth state changed:', user);
            if (user) {
                const uid = user.uid;
                const fetchedData = await getUser(uid);
                setUserData(fetchedData.user);
                setLoading(false);
            } else {
                console.log('redirecting to /');
                window.location.href = '/';
            }
        });
    }, [])



    if (loading) return null;
    return (
        <Page>
            <Header />
            <Main>
                <Card>
                    <ButtonContainer>
                        <BackButton onClick={() => window.location.href = '/dashboard'}><img src={BackButtonText} alt="Back" width="66%" /></BackButton>
                    </ButtonContainer>
                    <Title>이민준님의 기본 정보</Title>
                    <BodyContent>

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
                    </BodyContent>
                </Card>
            </Main>
            <Footer />
        </Page>
    )
}
