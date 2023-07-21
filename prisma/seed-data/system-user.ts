import { User } from "@prisma/client";

const SYSTEM_USER = {
  email: "system@bluepages.com.do",
  name: "System",
  emailVerified: new Date(),
  image: "./public/blue-pages-icon.png",
  password: "nopassword",
  firstName: "Blue",
  lastName: "Pages",
  gender: "OTHER",
  personalPhone: "(999) 999-9999",
  isVerified: true,
  isActive: true,
  termsOfService: true,
  roles: ["ADMINISTRATOR"],
} as User;

export default SYSTEM_USER;
