import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt"; //mã hóa mật khẩu
import validator from "validator"; //Kiểm tra định dạng mail

dotenv.config();


const register = async (req, res) => {
    try {

        const {userName, email, password, confirmPass, phone, avatar} = req.body;

        if (!userName.trim() || !email.trim() || password == undefined || confirmPass == undefined) {
          return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
        }

        if(!avatar) {
            // return res.status(400).json({message: `No image upload!`})
            return res.status(400).json({message: "Chưa chọn ảnh!"});
        };

        const user = await User.findOne({email})
        if(user) {
            // return res.status(400).json({message: `The email already exists!`});
            return res.status(400).json({message: "Email đã được sử dụng!"});
        }

        const validateEmail = (email) => {
            return validator.isEmail(email);
        }

        if(!validateEmail(email)) {
            // return res.status(400).json({message: `The email is invalid!`})
            return res.status(400).json({message: "Định dạng Email không hợp lệ!"});
        }

        if(password.length < 8) {
            // return res.status(400).json({message: `Password is at least 8 characters long!`});
            return res.status(400).json({message: "Mật khẩu phải chứa ít nhất 8 ký tự!"});
        }

        if(password !== confirmPass) {
            // return res.status(400).json({message: `Password and cofirmPass does not match!`});
            return res.status(400).json({message: "Mật khẩu vào xác nhận mật khẩu không khớp!"});
        }

        // Password Encryption 
      const passwordHash = await bcrypt.hash(password, 10)
      const newUser = new User({
          userName, email, password: passwordHash, phone, avatar
      })

      // Save mongodb
      await newUser.save()

      // Then create jsonwebtoken to authentication
      const accesstoken = createAccessToken({id: newUser._id})
      const refreshtoken = createRefreshToken({id: newUser._id})

      res.cookie('refreshtoken', refreshtoken, {
          httpOnly: true,
          //secure: true, // chỉ được gửi qua HTTPS
          //sameSite: 'none', // cho phép từ mọi trang web
          path: '/user/refresh_token',
          maxAge: 7*24*60*60*1000 // 7d
      })

      res.json({accesstoken})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!email.trim() || password == undefined) {
          return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
        }
      
        const validateEmail = (email) => {
            return validator.isEmail(email);
        }

        if(!validateEmail(email)) {
            // return res.status(400).json({message: `The email is invalid!`})
            return res.status(400).json({message: `Định dạng Email không hợp lệ!`});
        }

        if(!user) {
            // return res.status(400).json({message: `User does not exist!`});
            return res.status(400).json({message: `Tài khoản không tồn tại!`});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            // return res.status(400).json({message: `Incorrect password!`})
            return res.status(400).json({message: `Mật khẩu không đúng!`})
        }

        //If login success , create access token and refresh token
        const accesstoken = createAccessToken({id: user._id})
        const refreshtoken = createRefreshToken({id: user._id})

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            //secure: true, // chỉ được gửi qua HTTPS
            //sameSite: 'none', // cho phép từ mọi trang web
            path: '/user/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })
  
        res.json({accesstoken})
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const logout = async (req, res) =>{
    try {
        res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
        // return res.json({message: "Logged out"})
        return res.json({message: "Đăng xuất thành công!"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

// const refreshToken = (req, res) =>{
//     try {
//         const rf_token = req.cookies.refreshtoken;
//         if(!rf_token) return res.status(400).json({message: "Please Login or Register"})
  
//         jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
//             if(err) return res.status(400).json({message: "Please Login or Register"})
  
//             const accesstoken = createAccessToken({id: user.id})
  
//             res.json({accesstoken})
//         })
  
//     } catch (err) {
//         return res.status(500).json({message: err.message})
//     }
// }

const refreshToken = (req, res) =>{
    try {
        const rf_token = req.cookies.refreshtoken;

        if(!rf_token) {
            // return res.status(401).json({message: `Unauthorized. Please Login or Register!`});
            return res.status(401).json({message: `Không có quyền truy cập. Vui lòng đăng nhập hoặc đăng ký!`});
        }

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) {
                console.error(err);
                // return res.status(401).json({message: `Forbidden. Please Login or Register!`});
                return res.status(401).json({message: `Không có quyền truy cập. Vui lòng đăng nhập hoặc đăng ký!`});
            }
            //create accesstoken
            const accesstoken = createAccessToken({id: user.id})

            //Tạo RefreshToken mới và cập nhật nó trong cookies
            const newRefreshToken = createRefreshToken({ id: user.id });
            res.cookie('refreshtoken', newRefreshToken, {
                httpOnly: true,
                //secure: true, // chỉ được gửi qua HTTPS
                //sameSite: 'none', // cho phép từ mọi trang web
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            });
  
            res.json({accesstoken})
        })
  
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

const createAccessToken = (user) =>{
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
};

const createRefreshToken = (user) =>{
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
};

const getUserProfile = async (req, res) =>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user) {
            // return res.status(400).json({message: "User does not exist!"})
            return res.status(400).json({message: "Người dùng không tồn tại!"})
        }
  
        res.json(user);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

const updateUserProfile = async (req, res) => {
    try {
      const { userName, avatar, phone, city, district, ward, street } = req.body;
      const user = await User.findById(req.user.id);
  
      if (!user) {
        // return res.status(404).json({ message: "User not found." });
        return res.status(404).json({ message: "Không tìm thấy người dùng!" });
      }
  
      if (userName) {
        user.userName = userName;
      }
  
      if (avatar) {
        user.avatar = avatar;
      }
  
      if (phone) {
        user.phone = phone;
      }
  
      if (city) {
        user.address.city = city;
      }

      if (district) {
        user.address.district = district;
      }

      if (ward) {
        user.address.ward= ward;
      }

      if (street) {
        user.address.street = street;
      }
  
      await user.save();
  
      // res.status(200).json({ message: "Profile updated successfully" });
      res.status(200).json({ message: "Hồ sơ đã cập nhật thành công!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

const adminUpdateRoles = async (req, res) => {
  try {
    const userId = req.params.userId;
    const {newRole} = req.body;
    const user = await User.findById(userId);
    if(!user) {
      res.status(404).json({ message: "Không tìm thấy người dùng!"});
    }
    user.role = newRole;
    await user.save();
    res.status(200).json({message: "Đã cập nhật thành công!"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const changePassword = async (req, res) => {
    try {
      const { recentPass, newPass, confirmPass } = req.body;
      const userId = req.user.id
  
      if (recentPass.length == 0 || newPass.length == 0 || confirmPass.length == 0) {
        // return res.status(400).json({ message: "Please fill in all the fields!" });
        return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
      }
  
      if(recentPass.length < 8 || newPass.length < 8 || confirmPass.length < 8){
        // return res.status(400).json({message: "Password is at least 8 characters long!"})
        return res.status(400).json({message: "Mật khẩu phải chứa ít nhất 8 ký tự!"})
      } 
  
      const user = await User.findById(userId);
      if (!user) {
        // return res.status(400).json({ message: "User does not exist!" });
        return res.status(400).json({ message: "Tài khỏan không tồn tại!" });
      }
  
      const isMatch = await bcrypt.compare(recentPass, user.password);
      if (!isMatch) {
        // return res.status(400).json({ message: "Incorrect password!" });
        return res.status(400).json({ message: "Mật khẩu không đúng!" });
      }
  
      if (newPass !== confirmPass) {
        // return res.status(400).json({ message: "New password and confirm password does not match!" });
        return res.status(400).json({ message: "Mật khẩu mới và xác nhận mật khẩu không trùng khớp!" });
      }
  
      const passwordHash = await bcrypt.hash(newPass, 10);
      await User.findOneAndUpdate({ _id: userId }, { password: passwordHash });
  
      // res.status(200).json({ message: "Change password successfully!" });
      res.status(200).json({ message: "Đổi mới mật khẩu thành công!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
        member: users.length,
        users: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if(!user) {
      res.status(404).json({ message: "Không tìm thấy người dùng!"});
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({message: "Xóa thành công!"});
  } catch (error) {
      res.status(500).json({ message: error.message});
  }
};

export {
    register,
    login,
    logout,
    getUserProfile,
    refreshToken,
    updateUserProfile,
    changePassword,
    getAllUsers,
    adminUpdateRoles,
    deleteUser
}