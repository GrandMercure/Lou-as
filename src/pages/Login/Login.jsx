import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, User } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuthContext } from '../../contexts/AuthContext';
import { APP_NAME } from '../../utils/constants';
import logo from '../../assets/logo.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Substituir por Firebase Authentication
    login(username, password);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen">
      {/* Painel esquerdo – branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-mercure-navy p-12 lg:flex">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <img
            src={logo}
            alt={APP_NAME}
            className="h-64 w-auto max-w-[320px] object-contain drop-shadow-lg"
          />
          <h1 className="mt-10 text-3xl font-bold text-white">{APP_NAME}</h1>
          <p className="mt-3 max-w-md text-white/60">
            Controle de estoque de louças e utensílios do hotel.
          </p>
        </div>
        <div className="space-y-2">
          <div className="h-px w-16 bg-mercure-gold" />
          <p className="text-sm text-white/40">Gestão de Estoque · Stewarding</p>
        </div>
      </div>

      {/* Formulário */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <img
              src={logo}
              alt={APP_NAME}
              className="mx-auto h-44 w-auto max-w-[280px] object-contain"
            />
            <h1 className="mt-5 text-xl font-bold text-mercure-dark">{APP_NAME}</h1>
          </div>

          <div className="rounded-2xl border border-mercure-border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-mercure-dark">Bem-vindo</h2>
            <p className="mt-1 text-sm text-mercure-muted">Acesse o painel de controle de estoque</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="relative">
                <User className="absolute left-3.5 top-[38px] h-4 w-4 text-mercure-muted" />
                <Input
                  label="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Seu nome de usuário"
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-[38px] h-4 w-4 text-mercure-muted" />
                <Input
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
              <Button type="submit" variant="gold" size="lg" icon={LogIn} className="w-full">
                Entrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
