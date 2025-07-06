import * as z from "zod";

export const userSchema = z
  .object({
    fName: z
      .string()
      .min(2, "First Should atleast have 2 characters")
      .max(20, "Maximum length for first name is 20."),
    lName: z
      .string()
      .min(2, "Last Should atleast have 4 characters")
      .max(20, "Maximum length for last name is 20."),
    email: z
      .string()
      .min(1, "This is a required field.")
      .email({ message: "This is not a valid email." }),
    pass: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    cPass: z.string(),
  })
  .refine((data) => data.pass === data.cPass, {
    message: "Passwords do not match",
    path: ["cPass"],
  });

export interface UserSchemaTypes {
  fName: string;
  lName: string;
  email: string;
  pass: string;
  cPass: string;
}
