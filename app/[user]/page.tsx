import { getUser } from "@/actions/user";
import { getNotes } from "@/actions/note";
import SendNote from "@/components/SendNote";
import Note from "@/components/Note";

const UserPage = async ({ params } : { params : { user: string } }) => {
  const { user } = params
  const userData = await getUser(user)

  if (!userData) {
    return <div>Error: No user data found</div>;
  }

  if('error' in userData) {
    return <div>Error: {userData.error}</div>;
  }

  const noteData = await getNotes(userData.id)

  if (!noteData) {
    return <div>Error: No user data found</div>;
  }

  if('error' in noteData) {
    return <div>Error: {noteData.error}</div>;
  }

  console.log('this', userData)
  console.log('this2', noteData)
  return(
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
      <SendNote userId={userData.id} />
      {noteData.map((note) => (
        <Note key={note.id} content={note.content} from={note.from} />
      ))}
    </div>
  )
}

export default UserPage;