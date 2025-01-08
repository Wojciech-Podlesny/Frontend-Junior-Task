import {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import "./styles/AddParticipant.css";
import {useForm} from "react-hook-form";
import {HiOutlineArrowLeft} from "react-icons/hi";
import {FiAlertCircle} from "react-icons/fi";
import {participantSchema} from "./utils/validation";

type ParticipantFormData = z.infer<typeof participantSchema>;


export const AddParticipant = () => {

    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const {register, handleSubmit, setValue,formState:{errors},} = useForm<ParticipantFormData>({
        resolver: zodResolver(participantSchema),
        defaultValues: {
            name: "",
            email: "",
            workStart: "",
            workEnd: "",
        }
    });

    const onSubmit = async (data: ParticipantFormData)=> {
        try {
            const response = await fetch("http://localhost:3001/participants", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            if(response.ok) {
                setSuccessMessage("Participant added successfully.");
                navigate("/");
            } else {
                setSuccessMessage("Participant added failed.");
            }
        } catch(error: unknown) {
            console.error("Error adding participant", error);
        }
    }

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5 5H75V75H5V5ZM0 0V80H80V0H0Z" fill="#222222"/>
                        <path d="M60 55H41.6667V60H60V55Z" fill="#222222"/>
                        <path
                            d="M25 60V42.5H41.6667V37.5H25V25H41.6667V20H20V60H25Z"
                            fill="#222222"
                        />
                    </svg>
                </div>
                <NavLink to="/" className="back-link">
                    <HiOutlineArrowLeft className="back-arrow" /> Back to list
                </NavLink>
            </header>

            <main className="edit-participant-container">
                <h1 className="heading-title">Add Participant</h1>

                {successMessage && (
                    <span className="sucess-message">{successMessage}</span>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="add-form">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Full name *</label>
                        <div className="input-container">
                            <input
                                type="text"
                                id="name"
                                {...register("name")}
                                className={errors.name ? "error" : ""}
                            />
                            {errors.name && (
                                <FiAlertCircle className="error-icon" title="Error"/>
                            )}
                        </div>

                        {errors.name && (
                            <span className="error-message">{errors.name.message}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email address *</label>
                        <div className="input-container">
                            <input
                                type="text"
                                id="email"
                                {...register("email")}
                                className={errors.email ? "error" : ""}
                            />
                            {errors.email && (
                                <FiAlertCircle className="error-icon" title="Error"/>
                            )}
                        </div>
                        {errors.email && (
                            <span className="error-message">{errors.email.message}</span>
                        )}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="workStart" className="form-label">Work start *</label>
                            <div className="input-container">
                                <input
                                    type="date"
                                    id="workStart"
                                    {...register("workStart")}
                                    className={errors.workStart ? "error" : ""}
                                />
                                <div className="divider"></div>
                                {errors.workStart && (
                                    <>
                                        <FiAlertCircle className="error-icon" title="Error"/>
                                    </>
                                )}
                            </div>
                            {errors.workStart && (
                                <span className="error-message">{errors.workStart.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="workEnd" className="form-label">Work end *</label>
                            <div className="input-container">
                                <input
                                    type="date"
                                    id="workEnd"
                                    {...register("workEnd")}
                                    className={errors.workEnd ? "error" : ""}
                                />
                                <div className="divider"></div>
                                {errors.workEnd && (
                                    <>
                                        <FiAlertCircle className="error-icon" title="Error"/>
                                    </>
                                )}
                            </div>
                            {errors.workEnd && (
                                <span className="error-message">{errors.workEnd.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="submit-btn-container">
                        <button type="submit" className="submit-btn">Submit</button>
                    </div>
                </form>
            </main>
        </div>
    )
}