import React, { useState } from 'react';
import Input from '../components/UI/Input/Input'
import authService from "../services/auth.service";
import withNotAuth from '../HOC/withNotAuth';
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.getUserEmail(email)
      .then((data) => {
        if (data.response) {
          if (data.user.isSub) {
            router.push(`/login`);
          }
          else {
            router.push(`/signup/password/${data.user.email}`);
          }
        }
        else {
          router.push(`/signup/regform`);
        }
      })
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          label="Email"
          type="email"
          placeholder="Adresse email"
          name="email"
          id="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        >
        </Input>
        <input type="submit" className="btn btn-black" />
      </form>
    </div>
  );
}

export default withNotAuth(Home);