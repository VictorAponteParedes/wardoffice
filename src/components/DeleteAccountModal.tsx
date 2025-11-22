import { Trash2 } from "lucide-react";
import { translate } from "../lang";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    title?: string;
    itemName?: string;
    description?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmationModal({
    isOpen,
    title,
    itemName = "",
    description,
    onCancel,
    onConfirm,
}: DeleteConfirmationModalProps) {
    if (!isOpen) return null;

    const modalTitle = title || translate("DeleteModal.defaultTitle");
    const modalDescription = description || translate("DeleteModal.defaultDescription");

    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-50" onClick={onCancel} />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="relative max-w-sm w-full">
                    <div className="bg-rose-500 text-white text-center py-3 rounded-t-xl font-medium text-sm">
                        {translate("DeleteModal.permanentAction")}
                    </div>

                    <div className="bg-white rounded-b-xl shadow-2xl overflow-hidden">
                        <div className="bg-rose-500 px-6 py-8 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
                                <Trash2 className="w-10 h-10 text-rose-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{modalTitle}</h2>
                        </div>

                        <div className="px-6 py-8 text-center">
                            <p
                                className="text-gray-800 text-lg leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: itemName
                                        ? translate("DeleteModal.confirmWithName").replace("{name}", itemName)
                                        : translate("DeleteModal.confirmGeneric"),
                                }}
                            />
                            <br /><br />
                            <span className="text-gray-600">{modalDescription}</span>
                        </div>

                        <div className="px-6 pb-8 flex gap-4">
                            <button
                                onClick={onCancel}
                                className="flex-1 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
                            >
                                {translate("DeleteModal.cancel")}
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 py-4 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition shadow-lg"
                            >
                                {translate("DeleteModal.confirm")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}