import './Header.css'
import reactLogo from '../assets/react.svg'

export default function Header() {
    return (
        <header className="header">
            <div className="header_left">
                <p>학생</p>
            </div>
            <div className="header_title">Mirim Vote</div>
            <div className="header_right">
                <img src={reactLogo} alt="Profile" />
            </div>
        </header>
    )
}