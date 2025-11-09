// src/pages/auth/LoginPage.tsx
import { useState } from "react";
import { useAuth } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { Church, Sun, Sparkles } from "lucide-react";
import { TextInput } from "../../../components/form/TextInput";
import { PasswordInput } from "../../../components/form/PasswordInput";
import { MessageToast } from "../../../components/form/MessageToast";
import { translate } from "../../../lang";
import { RoutesView } from "../../../navigation/routes";
import { sudLogo, sudBackground } from "../../../assets/index";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const methods = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    title: string;
    description: string;
  } | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const success = await login(data.email, data.password);
      if (success) {
        setMessage({
          type: "success",
          title: translate("Login.messageSuccess.title"),
          description: translate("Login.messageSuccess.subtitle"),
        });
        setTimeout(
          () => navigate(RoutesView.dashboard, { replace: true }),
          2000
        );
      } else {
        setMessage({
          type: "error",
          title: translate("Login.messageError.title"),
          description: translate("Login.messageError.subtitle"),
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        title: translate("Login.errorGeneric"),
        description: translate("Login.errorGeneric"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center font-poppins overflow-hidden"
    >
      {/* ==================== FONDO NÍTIDO + ELEGANTE ==================== */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${sudBackground})`,
            backgroundPosition: "center 20%",
            filter: "brightness(0.92) contrast(1.05) saturate(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30" />
      </div>

      {/* Partículas de luz */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 opacity-40"
      >
        <Sparkles className="w-32 h-32 text-yellow-200" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-32 left-16 opacity-40"
      >
        <Sun className="w-28 h-28 text-amber-300" />
      </motion.div>

      {/* Card principal */}
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl shadow-2xl rounded-3xl overflow-hidden bg-white/96 backdrop-blur-2xl border border-white/50"
      >
        <div className="flex flex-col md:flex-row">
          {/* Panel izquierdo */}
          <div className="hidden md:flex flex-1 bg-primary items-center justify-center p-12 relative overflow-hidden">
            <div className="text-center text-primary z-10">
              <img
                src={sudLogo}
                alt="Ward Logo"
                className="w-52 mx-auto mb-8 drop-shadow-2xl rounded-lg"
              />
              <h1 className="text-5xl font-bold mb-4">Ward BackOffice</h1>
              <p className="text-xl opacity-95">Serve with purpose</p>
            </div>
          </div>

          {/* Panel derecho */}
          <div className="flex-1 p-10 lg:p-16">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-10">
                <Church className="w-14 h-14 text-primary mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-gray-800">
                  {translate("Login.title")}
                </h2>
                <p className="text-gray-600 mt-2">
                  {translate("Login.subtitle")}
                </p>
              </div>

              <FormProvider {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <TextInput
                    name="email"
                    label={translate("Login.emailLabel")}
                    type="email"
                    placeholder={translate("Login.emailPlaceholder")}
                  />
                  <PasswordInput
                    name="password"
                    label={translate("Login.passwordLabel")}
                    placeholder={translate("Login.passwordPlaceholder")}
                    showEyes
                  />

                  <div className="flex justify-end">
                    <a
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      {translate("Login.forgotPassword")}
                    </a>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-blue-800 transition disabled:opacity-60"
                  >
                    {isLoading
                      ? translate("Login.loading")
                      : translate("Login.buttonSubmit")}
                  </motion.button>
                </form>
              </FormProvider>

              {/* Logo móvil */}
              <div className="md:hidden mt-10 text-center">
                <img
                  src={sudLogo}
                  alt="Logo"
                  className="w-36 mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Toast */}
      {message && (
        <MessageToast {...message} onClose={() => setMessage(null)} />
      )}
    </motion.div>
  );
}
