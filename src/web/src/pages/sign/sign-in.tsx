import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input'; 
import { Eye, EyeOff, Loader } from 'lucide-react'; 
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import api from '@/api';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const navigate = useNavigate();
  
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset error states
    setUsernameError(false);
    setPasswordError(false);
    
    // Basic validation
    if (!username.trim()) {
      setUsernameError(true);
      return;
    }
    
    if (!password) {
      setPasswordError(true);
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await api.post('/users/login', {
        username,
        password
      });
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      
      toast.success('Login realizado com sucesso!');
      navigate('/rent'); // Redirect to home page after successful login
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          setUsernameError(true);
          toast.error('Usuário não encontrado.');
        } else if (error.response.status === 401) {
          setPasswordError(true);
          toast.error('Senha inválida.');
        } else {
          toast.error('Erro ao fazer login. Tente novamente.');
        }
      } else {
        toast.error('Erro de conexão. Verifique sua internet.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid lg:grid-cols-2 mx-7 md:mx-0 md:mt-0">
      <section className="flex flex-col justify-center py-20 md:py-44 items-center gap-5 border-black p-5 my-auto mx-auto w-full max-w-3xl">
        <form
          onSubmit={handleLogin}
          className="lg:max-w-md mt-20 md:mt-32 lg:mt-0 justify-center h-full mx-auto w-full flex flex-col gap-7"
        >
          <h3 className="text-4xl font-semibold text-center hidden lg:block">
            Entrar <span className="text-green-600">com</span>
          </h3>
          <div className="flex justify-center lg:hidden">
            <img src="/src/assets/logo.png" className="w-72" alt="Logo" />
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-600 relative">
            <label htmlFor="username">Usuário <span className="text-green-500">*</span></label>
            <Input
              id="username"
              placeholder="Digite seu nome de usuário"
              onChange={(e) => setUsername(e.target.value)}
              className={`${usernameError ? "border-green-600" : ""}`}
              type="text"
              required
            />
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-600 relative">
            <label htmlFor="password">Senha <span className="text-green-500">*</span></label>
            <Input
              id="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              className={`${passwordError ? "border-green-600" : ""}`}
              type={showPassword ? "text" : "password"}
              required
            />
            <Eye
              fontSize={18} 
              onClick={() => setShowPassword(false)} 
              className={`${showPassword ? "block" : "hidden"} absolute right-3 top-9 cursor-pointer`} 
            />
            <EyeOff 
              onClick={() => setShowPassword(true)} 
              fontSize={18} 
              className={`${showPassword ? "hidden" : "block"} absolute right-3 top-9 cursor-pointer`} 
            />
          </div>
          <button
            type="submit"
            className="text-white p-3 rounded-md border-0"
            disabled={loading}
            style={{ backgroundColor: "#10bd19" }}
          >
            {
              loading ? (
                <div className="flex justify-center">
                  <Loader className="animate-spin" />
                </div>
              ) : "Entrar"
            }
          </button>
          
          <p className="text-center text-sm text-gray-600">
            Não tem uma conta? <Link to="/sign-up" className="text-green-600 hover:underline">Cadastre-se</Link>
          </p>
        </form>
      </section>
      <section className="relative hidden lg:block w-full">
        <div className="h-svh object-cover" style={{ filter: "blur(3px)" }} />
        <div
          className="absolute inset-0 flex justify-center items-center"
          style={{ backgroundColor: "rgba(0, 233, 54, 0.493)" }}
        >
          <img src="/src/assets/logo.png" style={{ width: "320px" }} alt="Logo" />
        </div>
      </section>
    </main>
  );
};

export default SignIn;