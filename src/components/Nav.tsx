import Link from 'next/link'

export default function NavComp() {
    return (
        <>
            <div className="fixed z-[90] top-0 right-0 left-0 w-100% h-[70px] flex flex-row items-center justify-between primary-bg px-[20px]">
                <div className="logo ">
                    <Link href="/" className="text-3xl font-bold white">Sonarep</Link>
                </div>
                <a href='http://localhost:9000' target='_blank' className='text-2xl white font-semibold'>SonarQube UI</a>
            </div>
        </>
    )
}