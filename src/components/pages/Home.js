import React from 'react';
import { Link } from 'react-router-dom';
import Colors from '../../lib/colors';
import combine from '../../lib/style-composer';
import styles from '../../styles/pages/Home.module.scss';
import { Svg, Spacer, Button } from '../components';

const NavigationBar = () => (
    <div className={combine(styles, 'navigationBar')}>
        <Svg src={'/assets/logo.svg'} alt={'Logo'} size={'48px'} />
        <div className={combine(styles, 'navList')}>
            {['Get Started', 'Features', 'About Us'].map((text, index) => (
                <a
                    key={index}
                    href={'#'.concat(text.toLowerCase().replace(/ /g, '_'))}
                >
                    {text}
                </a>
            ))}
        </div>
        <Link
            style={{
                textDecoration: 'none',
            }}
            to='/login'
        >
            <Button
                color={Colors.primary}
                text={'Login'}
                width={160}
                height={52}
                borderRadius={6}
            />
        </Link>
    </div>
);

function Home() {
    return (
        <div className={combine(styles, 'component')}>
            <NavigationBar />
            <div className={combine(styles, 'hero', 'paddy')} id='get_started'>
                <Svg src={'/assets/hero.svg'} alt={'Hero'} size={'84vw'} />
                <Link
                    style={{
                        textDecoration: 'none',
                    }}
                    to='/signup'
                >
                    <Button
                        color={Colors.green}
                        text={'Get Started'}
                        width={240}
                        height={64}
                        borderRadius={6}
                    />
                </Link>
            </div>
            <Spacer size={132} />
            <div id={'features'} className={combine(styles, 'paddy')}>
                <Svg src={'/assets/features.svg'} alt={'Hero'} size={'100%'} />
            </div>
            <Spacer size={132} />
            <div id={'about_us'} className={combine(styles, 'paddy')}>
                <Svg src={'/assets/about-us.svg'} alt={'Hero'} size={'80%'} />
            </div>
            <Spacer size={132} />
        </div>
    );
}

export default Home;
