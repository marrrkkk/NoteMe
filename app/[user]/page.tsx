import { getUser } from "@/actions/user";

const UserPage = async ({ params } : { params : { user: string } }) => {
  const { user } = params
  const userData = await getUser(user)

  if (!userData) {
    return <div>Error: No user data found</div>;
  }

  if('error' in userData) {
    return <div>Error: {userData.error}</div>;
  }

  console.log('this', userData)
  return(
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
    </div>
  )
}

export default UserPage;