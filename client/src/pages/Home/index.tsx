import { FC } from "react";
import { useUser } from "../../contexts/user";
import { Link } from "react-router-dom";

export const Home: FC = () => {
  const { user } = useUser();
  return (
    <main className="h-full w-full lex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-semibold">Welcome to Splits</h1>
      <div className="text-lg">
        {user ? (
          `Welcome back, ${user.username}`
        ) : (
          <div className="flex gap-6">
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};
