import { useState } from "react";

interface UserLogin {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(formData));
    localStorage.setItem("isAuth", JSON.stringify({ isAuth: true }));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email </label>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            type="email"
            name="email"
            id="email"
            placeholder="enter email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
          <input
           className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            type="password"
            name="password"
            id="password"
            placeholder="enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="mt-2 rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
          >Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
