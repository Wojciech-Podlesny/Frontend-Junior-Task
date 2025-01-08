import {z} from "zod";

export const participantSchema = z.object({
    name: z.string().min(1,"The name is required"),
    email: z.string().email("The email address is required"),
    workStart: z.string().nonempty("The date is not correct"),
    workEnd: z.string().nonempty("The date is not correct"),
})
    .refine(
        (data: { workStart: string; workEnd: string }) =>
            new Date(data.workEnd) > new Date(data.workStart),
        {
            message: "Work end date must be after work start date",
            path: ["workEnd"],
        }
    );

