
import {  useAppSelector } from "../../app/hooks";

const UserProfile = () => {
  // const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, [dispatch]);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (!user) {
    return <h1>No user found</h1>;
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex">
        <h3>{user.firstName}</h3>-<p>{user.lastName}</p>
      </div>
      <img
        src={user.image}
        alt="user-image"
        className="w-12 h-12 rounded-full bg-black"
      />
    </div>
  );
};

export default UserProfile;
