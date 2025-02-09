"use client";
import { useAuth } from "@/src/hooks/auth/useAuth";
import React from "react";

const Page = () => {
  const [form, setForm] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "jyrwaboys@gmail.com",
    password: "123Clashofclan@",
  });
  const { login } = useAuth();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(form.email, form.password);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="email"
          value={form.email}
        />
        <input
          name="password"
          type="password"
          placeholder="email"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          value={form.password}
        />
        <button>submit</button>
      </form>
    </div>
  );
};
export default Page;
