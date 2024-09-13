const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../Models/usersModels');
require('dotenv').config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:2000/api/githubAuth/github/callback',
    scope: ['user:email', 'user:profile'] // طلب الأذونات المناسبة
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // استخراج المعلومات من الكائن profile
      const { id, username, photos } = profile;
      const email = (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : id + "@github.com";
      const profileImage = (photos && photos.length > 0) ? photos[0].value : '';

      // تحقق إذا كان المستخدم موجود بالفعل في قاعدة البيانات باستخدام البريد الإلكتروني
      let user = await User.findOne({ email: email });

      if (user) {
        return done(null, user);
      }

      // إذا لم يكن المستخدم موجودًا، قم بإنشائه
      user = await new User({
        firstName: username,
        email: email,
        profileImage: profileImage,
        githubId: id
      }).save();

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
