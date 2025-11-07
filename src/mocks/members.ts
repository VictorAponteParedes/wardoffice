import type { Member } from "../types/members";

export const mockMembers: Member[] = [
    { id: 1, name: "Hermano José López", email: "jlopez@ward.org", status: "active", lastTalk: "2025-10-15", calling: "Obispo" },
    { id: 2, name: "Hermana María Pérez", email: "mperez@ward.org", status: "active", lastTalk: "2025-09-20", calling: "Maestra" },
    { id: 3, name: "Elder Juan Gómez", email: "jgomez@ward.org", status: "inactive", lastTalk: "2025-08-01", calling: "Misionero" },
    // ... Agrega 47 más para 50 totales (puedes generarlos)
    { id: 50, name: "Hna. Ana Ruiz", email: "aruiz@ward.org", status: "active", lastTalk: "2025-11-03", calling: "Secretaria" },
];