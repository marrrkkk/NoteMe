const Note = ({ content, from } : { content: string, from: string }) => {
  return(
    <div>
      <h1>Message: {content}</h1>
      <p>From: {from}</p>
    </div>
  )
}

export default Note;