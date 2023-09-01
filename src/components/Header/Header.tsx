"use client";
import React, { useState } from "react";
import headerClassNames from "./headerClassName";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { toggleCart } from "@/redux/features/cartSlice";
import useCartTotals from "@/hooks/useCartTotals";
import Signup from "../Signup/Signup";
import { signIn, useSession, signOut } from "next-auth/react";
const Header = () => {
  const {
    header,
    container,
    li,
    logoContainer,
    link,
    logo,
    nav,
    ul,
    orders,
    contactUs,
    signupBtn,
    signinBtn,
    logoutBtn,
    cart,
  } = headerClassNames;

  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });

  const { totalQuantity } = useCartTotals();

  const dispatch = useAppDispatch();

  const toggleForm = () => {
    setIsSignupFormOpen(!isSignupFormOpen);
  };

  const signinHandler = async () => {
    try {
      await signIn();
    } catch (error) {
      console.log("Sign In Error", error);
    }
  };

  return (
    <>
      <Signup isSignupFormOpen={isSignupFormOpen} toggleForm={toggleForm} />
      <div className={header}>
        <div className={container}>
          <Link href="/" className={logoContainer}>
            <h1 className={logo}>Logo</h1>
          </Link>
          <nav className={nav}>
            <ul className={ul}>
              <li>
                <button onClick={() => dispatch(toggleCart())} className={link}>
                  <span className="text-lg">
                    Cart
                    <AiOutlineShoppingCart className="inline-block text-3xl" />
                  </span>
                  <div className={cart}>{totalQuantity}</div>
                </button>
              </li>
              <li className="flex items-center justify-center h-7">
                {session?.user && (
                  <>
                    <Link href="/orders" className={orders}>
                      Orders
                    </Link>
                    <button className={logoutBtn} onClick={() => signOut()}>
                      Logout
                    </button>
                  </>
                )}
                {!session?.user && (
                  <>
                    <button className={signupBtn} onClick={toggleForm}>
                      Sign Up
                    </button>
                    <button onClick={signinHandler} className={signinBtn}>
                      Sign In
                      <FcGoogle
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          marginLeft: "12px",
                        }}
                        className={link}
                      />
                    </button>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
