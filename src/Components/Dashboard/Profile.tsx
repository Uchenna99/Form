import axios from "axios";
import useGlobalState from "../../State";

const Profile = () => {
  const token = localStorage.getItem('token');
  const {} = useGlobalState();
  const userAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return (
    <>
        <div className="gen-wrap">
          <h3>Profile</h3>

          <button>Save changes</button>
        </div>
    </>
  )
}

export default Profile;