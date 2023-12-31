import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, "password should contain atleast 6 chars")
      .max(100),
    name: z.string().min(3, "name should contain atleast 3 chars").max(100),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6, "password should contain atleast 6 chars"),
  }),
});

export const addBalaceSchema = z.object({
  body: z.object({
    amount: z.number().gte(10, {
      message: "amount to be added must greater then or equal to 10",
    }),
  }),
});

export const transferAmountSchema = z.object({
  body: z.object({
    receiverId: z.string(),
    amount: z
      .number()
      .gte(10, { message: "amount must be greater then or equal to 10" }),
  }),
});

export type LoginUserSchema = z.infer<typeof loginUserSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type AddBalanceSchema = z.infer<typeof addBalaceSchema>;
export type TransferAmountSchema = z.infer<typeof transferAmountSchema>;
