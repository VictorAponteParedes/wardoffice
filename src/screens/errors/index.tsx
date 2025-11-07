// src/pages/errors/NotFound.tsx
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Church, Home, Mail, Sparkles, AlertTriangle } from "lucide-react";
import { sudLogo, sudBackground } from "../../assets/index";
import { translate } from "../../lang";
import { RoutesView } from "../../navigation/routes";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen flex items-center justify-center font-poppins overflow-hidden"
        >
            {/* Fondo templo NÍTIDO */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${sudBackground})`,
                        backgroundPosition: "center 20%",
                        filter: "brightness(0.92) contrast(1.05) saturate(1.1)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/40" />
            </div>

            {/* Partículas espirituales */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 right-20 opacity-30"
            >
                <Sparkles className="w-32 h-32 text-yellow-200" />
            </motion.div>

            {/* Card 404 */}
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 w-full max-w-4xl mx-auto p-8 lg:p-12 text-center bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50"
            >
                {/* Icono Error */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                >
                    <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-6 drop-shadow-lg" />
                </motion.div>

                {/* Título */}
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl lg:text-8xl font-bold text-gray-800 mb-4"
                >
                    {translate("PageNotFound.errorCode")}
                </motion.h1>

                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-semibold text-blue-800 mb-2"
                >
                    {translate("PageNotFound.title")}
                </motion.p>

                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
                >
                    {translate("PageNotFound.subtitle")}
                </motion.p>

                <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-500 mb-10"
                >
                    {translate("PageNotFound.description")}
                </motion.p>

                {/* Botones */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link to={RoutesView.dashboard}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3 bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-blue-800 transition-all"
                        >
                            <Home className="w-5 h-5" />
                            {translate("PageNotFound.buttonHome")}
                        </motion.button>
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-3 bg-gray-200 text-gray-800 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-300 transition-all"
                    >
                        <Mail className="w-5 h-5" />
                        {translate("PageNotFound.buttonContact")}
                    </motion.button>
                </motion.div>

                {/* Logo SUD abajo */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12"
                >
                    <img
                        src={sudLogo}
                        alt="Ward Logo"
                        className="w-32 mx-auto opacity-80"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        The Church of Jesus Christ of Latter-day Saints
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}