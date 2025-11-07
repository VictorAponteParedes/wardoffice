// src/screens/members/CreateMember.tsx
import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "../../components/TextInput";
import { ImageInput } from "../../components/ImageInput.tsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMembers } from "../../hooks/useMembers";
import { MessageToast } from "../../components/MessageToast";
import { translate } from "../../lang/index";
import { User, Phone, Mail, Home, ArrowLeft, PlusCircle, Church } from "lucide-react";
import type { Member } from "../../types/members";
import { Panel } from "primereact/panel";
import WardLayout from "../../layouts/WardLayout";

export default function CreateMember() {
    const methods = useForm<Member>();
    const navigate = useNavigate();
    const { createMember } = useMembers();
    const [message, setMessage] = useState<null | {
        type: "success" | "error";
        title: string;
        description: string;
    }>(null);

    const onSubmit = async (data: Member) => {
        try {
            const mockImageUrl = data.photo
                ? URL.createObjectURL(data.photo as any)
                : "default-avatar.png";

            const memberData: Omit<Member, "id"> = {
                name: data.name,
                age: data.age,
                calling: data.calling || "Miembro",
                photo: mockImageUrl,
                email: data.email || "",
                phone: data.phone || "",
                address: data.address || "",
                status: "active",
                lastTalk: null,
                attendance: [],
            };

            const id = createMember(memberData);

            setMessage({
                type: "success",
                title: translate("CreateMember.message.success.title"),
                description: translate("CreateMember.message.success.description"),
            });

            setTimeout(() => navigate(`/members/${id}`), 2000);
        } catch (error: any) {
            setMessage({
                type: "error",
                title: translate("CreateMember.message.error.title"),
                description: error.message || translate("CreateMember.message.error.description"),
            });
        }
    };

    return (
        <WardLayout>
            <FormProvider {...methods}>
                <motion.form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-xl space-y-6"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="text-gray-600 hover:text-blue-600 transition"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                                <Church size={28} />
                                {translate("CreateMember.title")}
                            </h1>
                        </div>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 shadow-md transition"
                        >
                            <PlusCircle size={18} />
                            <span>{translate("CreateMember.button.submit")}</span>
                        </button>
                    </div>

                    {/* Panel: Información Personal */}
                    <Panel
                        header={
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <User className="text-blue-600" size={18} />
                                </div>
                                <span className="font-semibold text-gray-800">
                                    {translate("CreateMember.fields.titleGeneralInfo")}
                                </span>
                            </div>
                        }
                        toggleable
                        className="mb-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <ImageInput name="photo" label={translate("CreateMember.fields.image.label")} />
                            </div>
                            <TextInput
                                name="name"
                                label={translate("CreateMember.fields.name.label")}
                                placeholder={translate("CreateMember.fields.name.placeholder")}
                                icon={User}
                            />
                            <TextInput
                                name="age"
                                label={translate("CreateMember.fields.age.label")}
                                placeholder={translate("CreateMember.fields.age.placeholder")}
                                type="number"
                            />
                            <TextInput
                                name="calling"
                                label={translate("CreateMember.fields.calling.label")}
                                placeholder={translate("CreateMember.fields.calling.placeholder")}
                            />
                        </div>
                    </Panel>

                    {/* Panel: Contacto */}
                    <Panel
                        header={
                            <div className="flex items-center gap-2">
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <Phone className="text-green-600" size={18} />
                                </div>
                                <span className="font-semibold text-gray-800">
                                    {translate("CreateMember.fields.titleContact")}
                                </span>
                            </div>
                        }
                        toggleable
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <TextInput
                                name="email"
                                label={translate("CreateMember.fields.email.label")}
                                placeholder={translate("CreateMember.fields.email.placeholder")}
                                type="email"
                                icon={Mail}
                            />
                            <TextInput
                                name="phone"
                                label={translate("CreateMember.fields.phone.label")}
                                placeholder={translate("CreateMember.fields.phone.placeholder")}
                                icon={Phone}
                            />
                            <div className="md:col-span-2">
                                <TextInput
                                    name="address"
                                    label={translate("CreateMember.fields.address.label")}
                                    placeholder={translate("CreateMember.fields.address.placeholder")}
                                    icon={Home}
                                />
                            </div>
                        </div>
                    </Panel>
                </motion.form>
            </FormProvider>

            {message && (
                <MessageToast {...message} onClose={() => setMessage(null)} />
            )}
        </WardLayout>
    );
}