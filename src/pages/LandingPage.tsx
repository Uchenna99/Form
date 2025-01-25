import useGlobalState from "../State";

const LandingPage = () => {
  const {} = useGlobalState();

  return (
    <>
      <div className="landing-cover">
        <p>Welcome to E-Learning</p>
      </div>
    </>
  )
}

export default LandingPage