import Logo from '../../assets/react.svg'

export const Header = () => {
    return (
        <>
            <header className="bg-gray-100 p-4">
                <img src={Logo} alt='logo.png' />
                <h1 className="text-2xl font-bold"> Task Management Application</h1>
            </header>
        </>
    )
}
