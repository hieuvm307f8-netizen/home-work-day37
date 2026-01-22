import { z } from "zod";

export const wizardSchema = z.object({
  email: z.string().min(1, "This field is required").email("Invalid email format"),
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number" })
    .min(18, "You must be at least 18")
    .positive(),

  username: z.string().min(4, "Username must be at least 4 characters"),
}).superRefine((data, ctx) => {
  if (data.username && data.firstName) {
    if (!data.username.toLowerCase().includes(data.firstName.toLowerCase())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["username"],
        message: `Username should contain your first name (${data.firstName})`,
      });
    }
  }
});