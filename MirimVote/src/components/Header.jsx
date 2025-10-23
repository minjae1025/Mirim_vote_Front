import styled from '@emotion/styled'
import reactLogo from '../assets/user_icon1.jpg'
import { useState, useRef } from 'react';
import ProfileMenu from './ProfileMenu'

const HeaderWrap = styled.header`
    height: 85px;
    background: #288157;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    box-sizing: border-box;
    position: relative;
`

const Left = styled.div`
    width: 100px;
    height: 40px;
    background: #F9F9F9;
    border-radius: 30px;
    display: flex;
    font-size: 24px;
    font-weight: 500;
    align-items: center;
    justify-content: center;
`

const Title = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 50px;
    font-weight: 600;
`

const Right = styled.div`
    width: 65px;
    height: 65px;
    background: transparent;
    border-radius: 85px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
`

export default function Header() {

    const [status, setStatus] = useState(false);
    const avatarRef = useRef(null);
    // const request = indexedDB.open("firebase", 2);
    // var memoObjectStore = db.transaction("memo").objectStore("memo");

    // request.onupgradeneeded = (event) => {
    //     const db = event.target.result;
    //     db.createObjectStore("firebase", { keyPath: "fbase_key" });
    // };

    // request.onsuccess = e => {
    //     alert(`uid: ${request.result.uid}`);
    // };

    return (
        <HeaderWrap>
            <Left>
                <p>학생</p>
            </Left>
            <Title><a href="/" style={{ color: 'white', textDecoration: 'none' }}>Mirim Vote</a></Title>
            <Right>
                <button ref={avatarRef} onClick={() => setStatus(v => !v)} aria-expanded={status} style={{ border: 0, background: 'transparent', padding: 0 }}>
                    <img src={reactLogo} alt="Profile" />
                </button>
                <ProfileMenu open={status} onClose={() => setStatus(false)} anchorRef={avatarRef} profile={{ avatar: reactLogo, email: 's2455@e-mirim.hs.kr', meta: '2학년 4반 김민재' }} />
            </Right>
        </HeaderWrap>
    )
}