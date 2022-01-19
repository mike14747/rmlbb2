import PropTypes from 'prop-types';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

import styles from '../styles/profile.module.css';

export default function PasswordResetForm({ handleUpdatePasswordSubmit, passwordError, newPassword, setNewPassword, repeatPassword, setrepeatPassword }) {
    return (
        <form className={styles.updateGroup} onSubmit={handleUpdatePasswordSubmit}>
            {passwordError && <p className={styles.error}>{passwordError}</p>}

            <FormInput
                id="newPassword"
                label="New Password"
                name="newPassword"
                type="password"
                value={newPassword}
                required={true}
                handleChange={(e) => setNewPassword(e.target.value)}
                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{8,20}$"
                errorMsg="New Password must be from 8 to 20 characters in length."
            />

            <FormInput
                id="repeatPassword"
                label="Repeat New Password"
                name="repeatPassword"
                type="password"
                value={repeatPassword}
                required={true}
                handleChange={(e) => setrepeatPassword(e.target.value)}
                pattern={newPassword}
                errorMsg="Passwords do not match."
            />

            <Button type="submit" size="medium" variant="contained" style="primary">Apply</Button>
        </form>
    );
}

PasswordResetForm.propTypes = {
    handleUpdatePasswordSubmit: PropTypes.func,
    passwordError: PropTypes.string,
    newPassword: PropTypes.string,
    setNewPassword: PropTypes.func,
    repeatPassword: PropTypes.string,
    setrepeatPassword: PropTypes.func,
};
