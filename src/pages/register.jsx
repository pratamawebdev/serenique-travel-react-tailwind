import FormRegister from "../components/Fragments/Auth/FormRegister";
import AuthLayouts from "../components/Layouts/Auth/AuthLayouts";

const RegisterPage = () => {
  return (
    <AuthLayouts type="register">
      <FormRegister />
    </AuthLayouts>
  );
};

export default RegisterPage;
