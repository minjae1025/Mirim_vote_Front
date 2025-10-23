import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import styled from '@emotion/styled'
import { auth } from '../services/firebase.js';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
`

const Card = styled.div`
  position: absolute;
  width: 300px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.12);
  padding: 18px;
  pointer-events: auto;
  border: 1px solid #888888;
`

const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: block;
  margin-bottom: 10px;
`

const Email = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 6px;
`

const Line = styled.hr`
  border: none;
  border-top: 1px solid #888888;
  margin: 12px 0;
`

const Item = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 24px;
  font-weight: 600;
`

const Title = styled.div`
  display: block;
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 12px;
`

const ItemText = styled.span`
    font-size: 24px;
    font-weight: 600;
    margin-left: 4px;
`

export default function ProfileMenu({ open, onClose, anchorRef, profile }) {

  const elRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    function onMouseDown(e) {
      if (!elRef.current) return
      if (elRef.current.contains(e.target)) return
      if (anchorRef && anchorRef.current && anchorRef.current.contains(e.target)) return
      onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onMouseDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [open, onClose, anchorRef])

  if (!open) return null

  const rect = anchorRef?.current?.getBoundingClientRect?.()
  const style = rect ? { top: rect.bottom + 20 + window.scrollY, right: 5 } : {}

  return createPortal(
    <Backdrop aria-hidden>
      <Card ref={elRef} style={style} role="menu" aria-label="프로필 메뉴">
        <Title>내 정보</Title>
        <Avatar src={profile?.avatar || '/src/assets/react.svg'} alt="avatar" />
        <Email>{profile?.email || 's2455@e-mirim.hs.kr'}</Email>
        <div style={{ color: 'rgb(44, 44, 44)', marginBottom: 8, fontSize: 18, fontWeight: 400}}>{profile?.meta || '2학년 4반 김민재'}</div>
        <Line />
        <Item role="menuitem"><ItemText>투표 상황</ItemText></Item>
  <Line />
  <Item role="menuitem" onClick={() => { onClose(); navigate('/mypage') }}><ItemText>마이페이지</ItemText></Item>
        <Line />
        <Item role="menuitem"><ItemText>로그아웃</ItemText></Item>
      </Card>
    </Backdrop>,
    document.getElementById('root')
  )
}
