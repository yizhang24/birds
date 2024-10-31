import Links from '@/app/ui/links';
import Logo from '@/app/ui/logo';
export default function TopNav() {
    return (
        <div className='absolute w-full flex flex-row p-4 justify-between'>
            <Logo />
            <Links />
        </div>
    );
}