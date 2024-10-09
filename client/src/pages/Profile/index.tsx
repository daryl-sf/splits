import { FC } from "react";
import { useUser } from "../../contexts/user";

export const Profile: FC = () => {
  const { user, updateUser } = useUser();

  const handleUserUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData);
    console.log(payload);
    try {
      await updateUser(payload);
      alert("User updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-4xl font-semibold">Profile</h1>
      <div className="text-lg flex flex-col gap-2">
        <p>
          <span className="font-semibold">Email:</span> {user?.email}
        </p>
        <p>
          <span className="font-semibold">Username:</span> {user?.username}
        </p>
        <p>
          <span className="font-semibold">Joined on:</span>{" "}
          {new Date(user.createdAt).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Last Updated:</span>{" "}
          {new Date(user.updatedAt).toLocaleString()}
        </p>
        <form onSubmit={handleUserUpdate} className="flex flex-col gap-2">
          <label className="font-semibold flex gap-2">
            Password:
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter new password"
              className="font-normal px-2 border border-gray-300 rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Password
          </button>
        </form>
      </div>
    </main>
  );
};
