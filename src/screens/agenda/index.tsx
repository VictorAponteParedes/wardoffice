// src/pages/agenda/Agenda.tsx
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import WardLayout from "@/layouts/WardLayout";
import { AgendaHeader } from "./components/AgendaHeader";
import { GeneralInfoSection } from "./components/GeneralInfoSection";
import { WelcomeSection } from "./components/WelcomeSection";
import { OpeningSection } from "./components/OpeningSection";
import { SacramentSection } from "./components/SacramentSection";
import { ProgramSection } from "./components/ProgramSection";
import { ClosingSection } from "./components/ClosingSection";

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
      speakers: [],
      testimoniesList: [],
    },
  });

  const onSubmit = (data: any) => {
    console.log("Agenda completa:", data);
  };

  return (
    <WardLayout>
      <div className="min-h-screen bg-gray-50/50 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <AgendaHeader />

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <GeneralInfoSection />
              <WelcomeSection />
              <OpeningSection />
              <SacramentSection />
              <ProgramSection />
              <ClosingSection />

              {/* Botón Guardar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-end pt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-sud-blue text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-sud-blue/20 hover:bg-sud-blue/90 transition-all"
                >
                  Guardar Agenda
                </motion.button>
              </motion.div>
            </form>
          </FormProvider>
        </div>
      </div>
    </WardLayout>
  );
}
