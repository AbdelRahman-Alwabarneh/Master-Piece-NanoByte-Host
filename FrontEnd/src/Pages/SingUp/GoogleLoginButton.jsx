import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // الحصول على id_token
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        // إرسال id_token إلى الخادم الخاص بك
        const res = await axios.post(
          "http://localhost:2000/api/googleAuth",
          {
            id_token: tokenResponse.access_token,
            google_id: data.sub,
            email: data.email,
            name: data.name,
            picture: data.picture,
          },
          { withCredentials: true }
        );
        
        // navigate("/", { state: { signedUp: true } });
        console.log("تم تسجيل الدخول بنجاح:");
      } catch (error) {
        console.error("فشل تسجيل الدخول:", error);
      }
    },
    onError: (error) => console.error("خطأ في تسجيل الدخول:", error),
  });

  return (
    <button
      className="text-[2.4rem] no-underline text-white"
      onClick={() => login()}
    >
      <i className="fa-brands fa-google"></i>
    </button>
  );
};

export default GoogleLoginButton;
