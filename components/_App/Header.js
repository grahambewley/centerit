import { Menu, Container} from "semantic-ui-react";
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

function Header() {
    const router = useRouter();

    function isActive(route) {
        return route === router.pathname;
    }

    return (
        <Menu stackable secondary>
            <Container text>
                <Link href="/">
                    <Menu.Item header active={isActive("/")}>
                        Home
                    </Menu.Item>
                </Link>
                <Link href="/about">
                    <Menu.Item header active={isActive("/about")}>
                        About
                    </Menu.Item>
                </Link>
            </Container>
        </Menu>
    );
}

export default Header;