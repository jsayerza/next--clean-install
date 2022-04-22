import { useState } from "react";
import { useUser } from "context/authContext";
import { GoogleIcon } from "icons/GoogleIcon";

export default function Login() {
  const { handleLogin } = useUser();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center items-center m-auto min-h-screen gap-3">
        <h1 className="text-6xl text-center font-bold">Welcome</h1>
        <h2 className="text-3xl text-center font-bold">Login to continue</h2>

        <button
          className="mt-4 px-6 py-3 bg-gray-200 text-black font-bold text-lg  flex gap-2 items-center rounded hover:bg-gray-300 hover:scale-110 transition duration-200"
          onClick={handleLogin}
        >
          <GoogleIcon size="2rem" />
          Login with Google
        </button>
      </div>
    </div>
  );
}
