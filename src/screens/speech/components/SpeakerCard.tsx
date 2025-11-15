// src/speech/components/SpeakerCard.tsx
import { Mic, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import type { SpeakerType } from "../../../types/speech";


export default function SpeakerCard({ speaker }: { speaker: SpeakerType }) {
    const navigate = useNavigate();
    const { isDark } = useTheme();

    return (
        <div
            onClick={() => navigate(`/speech/${speaker.id}`)}
            className={`p-6 rounded-2xl shadow-xl cursor-pointer transition-all hover:scale-105 hover:shadow-2xl ${isDark
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-primary"
                }`}
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    {speaker.photo ? (
                        <img src={speaker.photo} alt={speaker.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <User className="w-10 h-10 text-white" />
                    )}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-primary dark:text-primary">
                        {speaker.name}
                    </h3>
                    {speaker.calling && (
                        <p className="text-sm text-gray-600 dark:text-primary">{speaker.calling}</p>
                    )}
                </div>
            </div>

            {speaker.topic && (
                <div className="flex items-start gap-3 mb-3">
                    <Mic className="w-5 h-5 text-primary mt-1" />
                    <p className="font-medium text-primary dark:text-primary">
                        {speaker.topic}
                    </p>
                </div>
            )}

            {speaker.date && (
                <div className="flex items-center gap-2 text-sm text-primary dark:text-gray-400">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Date(speaker.date).toLocaleDateString("es-PY")}
                </div>
            )}
        </div>
    );
}