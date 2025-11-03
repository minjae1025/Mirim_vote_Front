import styled from '@emotion/styled'
import { useState, useRef, useEffect } from 'react';
import ProfileMenu from './ProfileMenu'
import { auth, getUser } from '../services/firebase.js';
import { onAuthStateChanged } from "firebase/auth";


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
    const [userData, setUserData] = useState(null);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const avatarRef = useRef(null);
    const initialAuthCheckDone = useRef(false);

    useEffect(() => {
        if (initialAuthCheckDone.current) return;
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    const fetchedData = await getUser(uid);
                    setUserData(fetchedData.user);
                    setLoading(false);
                    initialAuthCheckDone.current = true;
                } else {
                    console.log('redirecting to /');
                    window.location.href = '/';
                }
            });

        return () => unsubscribe();
    }, [])

    
    
    if (loading) return null; // 초기 렌더링 없이 대기

    // console.log(userData);
    return (
        <HeaderWrap>
            <Left>
                <p>{userData.type == 'teacher' ? "선생님" : "학생"}</p>
            </Left>
            <Title><a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Mirim Vote</a></Title>
            <Right>
                <button ref={avatarRef} onClick={() => setStatus(v => !v)} aria-expanded={status} style={{ border: 0, background: 'transparent', padding: 0 }}>
                    <img src={userData.photoURL} alt="Profile" />
                </button>
                <ProfileMenu open={status} onClose={() => setStatus(false)} anchorRef={avatarRef} profile={ userData } />
            </Right>
        </HeaderWrap>
    )
}


// 민바오 !!
// 에러난다 ㅎㅎㅎ!!!!
// 헉쓰 