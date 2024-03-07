import Image from 'next/image'
import Link from 'next/link'
import {useTheme} from '~/lib/theme'

const Nav = () => {
    const {isDarkMode} = useTheme()

    return (
        <div className="container mx-auto">
            <nav className="w-full border-b p-4 flex justify-between">
                <Link href="/">
                    <a className="flex">
                        <Image
                            src={
                                isDarkMode
                                    ? '/images/supabase-logo-wordmark--dark.png'
                                    : '/images/supabase-logo-wordmark--light.png'
                            }
                            alt="AI Tool Dr Logo"
                            height={37}
                            width={120}
                        />
                    </a>
                </Link>

                <div className="flex mt-2">
                    <Link href="/posts/">
                        <a className="flex ">
                            <p className="p">Ai Tools</p>
                        </a>
                    </Link>

                    <Link href="/submit/">
                        <a className="flex ml-10">
                            <p className="p">Submit Ai Tool</p>
                        </a>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Nav
