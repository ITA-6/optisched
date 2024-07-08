import Form from "./Form";
import Banner from "./Banner";

const Login = () => {
  return (
    <div className="bg-green flex min-h-[100vh] items-center justify-center">
      <main className="flex h-[44.9375em]">
        <Banner />
        <Form />
      </main>
    </div>
  );
};

export default Login;
