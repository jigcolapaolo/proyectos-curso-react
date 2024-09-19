import { Link } from "../Link";

export default function Page404() {
  return (
    <>
      <div>
        <h1>This is NOT fine</h1>
        <img
          src="https://media.tenor.com/fKIG2kiLVPgAAAAM/this-is-fine-its-fine.gif"
          alt="GIF del perro This is Fine"
        />
      </div>
      <Link to="/">Volver a Home</Link>
    </>
  );
}
