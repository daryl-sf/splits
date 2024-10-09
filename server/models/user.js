import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  confirmedAt: {
    type: Date,
    default: null
  },
  confirmationToken: {
    type: String,
    default: null
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.confirmationToken;
  return user;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', function(next) {
  const user = this;
  if (user.isModified()) {
    user.updatedAt = new Date();
  }

  user.createdAt = user.createdAt || new Date();
  user.confirmationToken = user.confirmationToken || Math.random().toString(36).substring(2);

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', userSchema);

export default User;
