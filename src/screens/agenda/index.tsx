// src/pages/agenda/Agenda.tsx
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { User, Church, Music, BookOpen, Sparkles, Users } from "lucide-react";
import { translate } from "../../lang";
import WardLayout from "../../layouts/WardLayout";
import { TextInput } from "../../components/form/TextInput";
import { TextArea } from "../../components/form/TextArea";
import { DateInput } from "../../components/form/inputDate";

export default function Agenda() {
  const methods = useForm({
    defaultValues: {
      date: "",
      leader: "",
      presider: "",
      welcome: "",
      announcements: "",
      openingHymn: "",
      openingPrayer: "",
      business: "",
      sacramentalHymn: "",
      testimonies: false,
      closingHymn: "",
      closingPrayer: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Agenda:", data);
  };

  return (
    <WardLayout>
      <div className="min-h-screen bg-gradient-to-br from-sud-light via-white to-sud-light/50 py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 opacity-20 pointer-events-none"
        >
          <Sparkles className="w-64 h-64 text-sud-gold/20" />
        </motion.div>

        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-sud-light p-8 md:p-12"
          >
            {/* Título */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-3 mb-4"
              >
                <BookOpen className="w-10 h-10 text-sud-blue" />
                <h1 className="text-4xl md:text-5xl font-bold text-sud-blue">
                  {translate("Agenda.title") || "Crear Agenda"}
                </h1>
              </motion.div>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                {/* Fecha, Dirige, Preside */}
                <div className="grid md:grid-cols-3 gap-6">
                  <DateInput
                    name="date"
                    label="Fecha"
                    placeholder="dd/Mes/aaaa"
                  />
                  <TextInput
                    name="leader"
                    label="Dirige"
                    placeholder="Nombre del dirigente"
                    icon={User}
                  />
                  <TextInput
                    name="presider"
                    label="Preside"
                    placeholder="Obispo / Presidente de rama"
                    icon={Church}
                  />
                </div>

                {/* Bienvenida */}
                <TextArea
                  name="welcome"
                  label="Bienvenida y reconocimiento"
                  placeholder="Escribe el mensaje de bienvenida..."
                  rows={2}
                />

                {/* Anuncios */}
                <TextArea
                  name="announcements"
                  label="Anuncios"
                  placeholder="Escribe un anuncio por línea..."
                  rows={6}
                />

                {/* Himno y oración de apertura */}
                <div className="grid md:grid-cols-2 gap-6">
                  <TextInput
                    name="openingHymn"
                    label="Himno de Apertura"
                    placeholder="N° Título del himno"
                    icon={Music}
                  />
                  <TextInput
                    name="openingPrayer"
                    label="Oración de Apertura"
                    placeholder="Nombre del hermano/a"
                    icon={User}
                  />
                </div>

                {/* Asuntos */}
                <TextArea
                  name="business"
                  label="Asuntos"
                  placeholder="Escribe cada asunto en una línea..."
                  rows={3}
                />

                {/* Himno Sacramental */}
                <TextInput
                  name="sacramentalHymn"
                  label="Himno Sacramental"
                  placeholder="N° Título del himno"
                  icon={Music}
                />

                {/* Testimonios */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    {...methods.register("testimonies")}
                    className="w-5 h-5 text-sud-blue rounded focus:ring-sud-blue"
                  />
                  <label className="font-medium text-gray-700 flex items-center gap-2">
                    <Users className="w-5 h-5 text-sud-blue" />
                    Incluir Tiempo de Testimonios
                  </label>
                </div>

                {/* Himno y oración final */}
                <div className="grid md:grid-cols-2 gap-6">
                  <TextInput
                    name="closingHymn"
                    label="Himno Final"
                    placeholder="N° Título del himno"
                    icon={Music}
                  />
                  <TextInput
                    name="closingPrayer"
                    label="Oración Final"
                    placeholder="Nombre del hermano/a"
                    icon={User}
                  />
                </div>

                {/* Botón */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-sud-blue text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-sud-blue/90 transition"
                >
                  Guardar Agenda
                </motion.button>
              </form>
            </FormProvider>
          </motion.div>
        </div>
      </div>
    </WardLayout>
  );
}
