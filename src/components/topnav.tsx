import Links from '@/components/links';
import Logo from '@/components/logo';
export default function TopNav() {
    return (
        <div className='absolute w-full flex flex-row p-4 justify-between'>
            <Logo />
            <Links />
        </div>
    );
}