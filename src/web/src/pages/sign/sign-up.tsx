import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import api from '@/api';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset error states
    setUsernameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    
    // Basic validation
    if (!username.trim()) {
      setUsernameError(true);
      toast.error('Nome de usuário é obrigatório.');
      return;
    }
    
    if (!password) {
      setPasswordError(true);
      toast.error('Senha é obrigatória.');
      return;
    }
    
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      toast.error('As senhas não coincidem.');
      return;
    }
    
    setLoading(true);
    
    try {
      await api.post('/users', {
        username,
        password,
        level: 'user', // Default level for new users
        status: true // Active by default
      });
      
      toast.success('Cadastro realizado com sucesso!');
      navigate('/sign-in'); // Redirect to sign-in page
    } catch (error: any) {
      if (error.response) {
        toast.error('Erro ao criar conta. Tente novamente.');
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
          onSubmit={handleSignUp}
          className="lg:max-w-md mt-20 md:mt-32 lg:mt-0 justify-center h-full mx-auto w-full flex flex-col gap-7"
        >
          <h3 className="text-4xl font-semibold text-center hidden lg:block">
            Cadastro <span className="text-green-600">de usuário</span>
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
          <div className="flex flex-col gap-2 text-sm text-gray-600 relative">
            <label htmlFor="confirmPassword">Confirmar Senha <span className="text-green-500">*</span></label>
            <Input
              id="confirmPassword"
              placeholder="Confirme sua senha"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${confirmPasswordError ? "border-green-600" : ""}`}
              type={showConfirmPassword ? "text" : "password"}
              required
            />
            <Eye
              fontSize={18}
              onClick={() => setShowConfirmPassword(false)}
              className={`${showConfirmPassword ? "block" : "hidden"} absolute right-3 top-9 cursor-pointer`}
            />
            <EyeOff
              onClick={() => setShowConfirmPassword(true)}
              fontSize={18}
              className={`${showConfirmPassword ? "hidden" : "block"} absolute right-3 top-9 cursor-pointer`}
            />
          </div>
          <button
            type="submit"
            className="text-white p-3 rounded-md border-0"
            disabled={loading}
            style={{ backgroundColor: "#06F438" }}
          >
            {
              loading ? (
                <div className="flex justify-center">
                  <Loader className="animate-spin" />
                </div>
              ) : "Cadastrar"
            }
          </button>
          
          <p className="text-center text-sm text-gray-600">
            Já tem uma conta? <Link to="/sign-in" className="text-green-600 hover:underline">Entrar</Link>
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

export default SignUp;