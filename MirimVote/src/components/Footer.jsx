import styled from '@emotion/styled'
import meister from '../assets/meister.png'

const FooterWrap = styled.footer`
  width: 100%;
  border-top: 1px solid #d9d9d9;
  background: #fff;
  padding: 18px 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  width: 72px;
  height: auto;
  margin-right: 36px;
  margin-left: 24px;
`

const TextWrap = styled.div`
  color: #222;
  font-size: 12px;
  line-height: 1.4;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
`

const Meta = styled.div`
  color: #666;
  font-size: 14px;
  font-weight: 400;
`

export default function Footer() {
  return (
    <FooterWrap>
      <Logo src={meister} alt="Meister" />
      <TextWrap>
        <Title>미림마이스터고등학교 전자 투표 시스템</Title>
        <Meta>
          (08821) 서울시 관악구 호암로 546 (신림동)
          <br />546 Hoam-ro, Gwanak-gu, Seoul, 08821 Korea
          <br />기획 / 개발 / 디자인 | s2406@e-mirim.hs.kr / s2409@e-mirim.hs.kr / s2455@e-mirim.hs.kr
        </Meta>
      </TextWrap>
    </FooterWrap>
  )
}
