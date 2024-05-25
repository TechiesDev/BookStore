const User = require('../model/UserModel');

async function clearOldOtp() {
    const timeBefore = new Date();

    try {
        const result = await User.updateMany(
            { timeExpire: { $lt: timeBefore } },
            { $set: { otp: null, timeExpire: null } }
        );
        console.log(`Cleared OTP in these rows: ${result.nModified}`, timeBefore);
    } catch (error) {
        console.error('Error clearing old OTPs:', error);
    }
}

module.exports = { clearOldOtp };
