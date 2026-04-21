import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className='flex justify-between items-center p-4 border-b border-border'>
            <Link to="/">
                <div>Termix</div>
            </Link>
            <div className='flex gap-4 text-sm'>
                <Link to="/">
                    <div>Home</div>
                </Link>
                <Link to="/analyze">
                    <div>Analyze</div>
                </Link>
                <Link to="/about">
                    <div>About</div>
                </Link>
                <Link to="/contact">
                    <div>Contact</div>
                </Link>
            </div>
        </header>
    )
}

export default Header