"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export default function() {
    const session = useSession()
    return (
        <div>
            <button onClick={() => signIn()}>Sign In</button>
            <button onClick={() => signOut({ callbackUrl: '/sigin' })}>Logout</button>
            {JSON.stringify(session)}
        </div>
    )
}