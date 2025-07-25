import { convexAuth } from '@convex-dev/auth/server'
import Google from '@auth/core/providers/google'

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Google({
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          avatar: profile.picture,
          username: profile.given_name,
          elo: {
            flow: 0,
            rapid: 0,
          },
          friends: [],
          lastActive: Date.now(),
        }
      },
    }, ),
  ],
})
