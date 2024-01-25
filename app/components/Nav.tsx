import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '~/lib/theme'

const Nav = () => {
  const { isDarkMode } = useTheme()

  return (
    <nav className="w-full border-b bg-scale-300 p-4">
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
    </nav>
  )
}

export default Nav
