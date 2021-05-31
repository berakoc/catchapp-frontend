import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Colors from '../../lib/colors';
import combine from '../../lib/style-composer';
import styles from '../../styles/atoms/UserCard.module.scss';
import { FlexButton, Statistics } from '../components';

const mapStateToProps = ({ user }) => ({
    user,
});
function UserCard({ user, isSpecial }) {
    return (
        <div className={combine(styles, 'component')}>
            <div className={combine(styles, 'info')}>
                <div
                    style={{
                        backgroundColor: user.profilePicture,
                    }}
                    className={combine(styles, 'image')}
                />
                <div className={combine(styles, 'block')}>
                    <div>
                        <div className={combine(styles, 'name')}>
                            {user.name}
                        </div>
                        <div className={combine(styles, 'title')}>
                            {user.title}
                        </div>
                    </div>
                    <Statistics
                        numberOfEvents={user.numberOfEventsCreated || 0}
                        numberOfFollowers={user.numberOfFollowers || 0}
                        rating={user.rating || 0}
                    />
                </div>
            </div>
            {!isSpecial && (
                <div className={combine(styles, 'buttons')}>
                    <FlexButton
                        text='Chat'
                        color={Colors.primaryLight}
                        backgroundColor={Colors.white}
                        borderColor={Colors.gray}
                        handleClick={() => console.log('Chat')}
                    />
                    <div className={combine(styles, 'spacer')} />
                    <FlexButton
                        text='Follow'
                        color={Colors.white}
                        backgroundColor={Colors.primary}
                        borderColor={Colors.primary}
                        handleClick={() => console.log('Follow')}
                    />
                </div>
            )}
            <div
                className={combine(
                    styles,
                    'aboutTitle',
                    isSpecial ? 'marginTop' : ':null'
                )}
            >
                About
            </div>
            <div className={combine(styles, 'about')}>{user.description}</div>
        </div>
    );
}

UserCard.propTypes = {
    isSpecial: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(UserCard);
